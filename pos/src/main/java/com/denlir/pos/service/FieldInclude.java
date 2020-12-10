package com.denlir.pos.service;

import com.denlir.pos.entity.BaseAuditEntity;
import com.denlir.pos.entity.BaseEntity;
import com.denlir.pos.payload.BaseAuditPayload;
import com.denlir.pos.payload.BaseMapper;
import com.denlir.pos.payload.BasePayload;
import com.denlir.pos.payload.domain.UserMapper;
import com.denlir.pos.payload.domain.UserMapperImpl;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Arrays;
import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.function.BiConsumer;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static lombok.AccessLevel.PRIVATE;

@RequiredArgsConstructor(access = PRIVATE)
public class FieldInclude<E, P> {

  private final E entity;

  @Getter
  private final P payload;

  private final List<String> includeFields;

  public static <E, P> FieldInclude<E, P> ofEntityAndMapper(E entity, BaseMapper<E, P> mapper, String... includeFields) {
    List<String> includedFields = includeFields == null ? List.of() : Arrays.asList(includeFields);

    if (includedFields.stream().anyMatch(x -> x.equalsIgnoreCase("all"))) {
      return new FieldInclude<>(entity, mapper.entityToPayload(entity), includedFields);
    }

    return new FieldInclude<>(entity, mapper.partialEntityToPayload(entity), includedFields);
  }

  private static <E, P> FieldInclude<E, P> ofEntityAndPayload(E entity, P payload, List<String> includeFields) {
    return new FieldInclude<>(entity, payload, includeFields);
  }

  public Assigner.Finalizer<E, P> includeAuditFields() {
    if (entity instanceof BaseAuditEntity && payload instanceof BaseAuditPayload) {
      UserMapper userMapper = new UserMapperImpl();
      return this
          .ofField("createdByUser")
          .withGetter(x -> ((BaseAuditEntity) x).getCreatedByUser())
          .map(userMapper::entityToPayload)
          .withSetter((p, u) -> ((BaseAuditPayload) p).setCreatedByUser(u))
          .and()
          .ofField("modifiedByUser")
          .withGetter(x -> ((BaseAuditEntity) x).getModifiedByUser())
          .map(userMapper::entityToPayload)
          .withSetter((p, u) -> ((BaseAuditPayload) p).setModifiedByUser(u));
    }

    return new Assigner.Finalizer<>() {
      @Override
      public FieldInclude<E, P> and() {
        throw new UnsupportedOperationException("Entity: " + entity + " is not BaseAuditEntity or Payload: " + payload + " is not BaseAuditPayload");
      }

      @Override
      public P get() {
        return payload;
      }
    };
  }

  public Assigner<E, P> ofField(String field) {
    var i = this;

    return new Assigner<>() {
      @Override
      public <E1> Mapper<E, P, E1> withGetter(Function<E, E1> function) {
        return new Mapper<>() {
          @Override
          public <P1> Setter<E, P, P1> map(Function<E1, P1> mapper) {
            return biConsumer -> new Finalizer<>() {
              @Override
              public FieldInclude<E, P> and() {
                if (includeFields.contains(field)) {
                  E1 e1 = function.apply(entity);
                  P1 p1 = mapper.apply(e1);
                  biConsumer.accept(payload, p1);
                }
                return i;
              }

              @Override
              public P get() {
                if (includeFields.contains(field)) {
                  E1 e1 = function.apply(entity);
                  P1 p1 = mapper.apply(e1);
                  biConsumer.accept(payload, p1);
                }
                return payload;
              }
            };
          }
        };
      }
    };
  }

  public OtherServiceUser<E, P> mappingFields(Map<String, String> mappedFields) {
    var fieldInclude = this;

    return new OtherServiceUser<>() {
      @Override
      public <E1, P1> FurtherGetter<E, P, E1, P1> withGetters(Function<E, ? extends Collection<E1>> entity, Function<P, ? extends Collection<P1>> payload) {
        return new FurtherGetter<>() {
          @Override
          public <E2, P2> ServiceUser<E, P, P1, E2, P2> furtherGetters(Function<E1, E2> furtherGetterForEntity, Function<P1, P2> furtherGetterForPayload) {
            return new ServiceUser<>() {
              @Override
              public <S extends BasicServiceOperation<E2, P2, ?>> Setter<E, P, P1> useService(S service) {
                return biConsumer -> new Finalizer<>() {
                  @Override
                  public FieldInclude<E, P> and() {
                    logic();
                    return fieldInclude;
                  }

                  @Override
                  public P get() {
                    logic();
                    return fieldInclude.getPayload();
                  }

                  private void logic() {
                    List<E1> entities = entity.apply(fieldInclude.entity).stream().sorted(Comparator.comparing(x -> ((BaseEntity) x).getId())).collect(Collectors.toList());
                    List<P1> payloads = payload.apply(fieldInclude.payload).stream().sorted(Comparator.comparing(x -> ((BasePayload) x).getId())).collect(Collectors.toList());

                    IntStream.iterate(0, x -> x < entities.size(), x -> x + 1)
                        .forEach(i -> {
                          P1 p1 = payloads.get(i);
                          E2 e2 = furtherGetterForEntity.apply(entities.get(i));
                          P2 p2 = furtherGetterForPayload.apply(p1);
                          List<String> values = includeFields.stream().map(mappedFields::get).filter(Objects::nonNull).collect(Collectors.toList());
                          service.includeFields(ofEntityAndPayload(e2, p2, values));
                        });
                    biConsumer.accept(fieldInclude.payload, payloads);
                  }
                };
              }
            };
          }
        };
      }
    };
  }

  public interface OtherServiceUser<E, P> {

    <E1, P1> FurtherGetter<E, P, E1, P1> withGetters(Function<E, ? extends Collection<E1>> entity, Function<P, ? extends Collection<P1>> payload);

    interface FurtherGetter<E, P, E1, P1> {
      <E2, P2> ServiceUser<E, P, P1, E2, P2> furtherGetters(Function<E1, E2> furtherGetterForEntity, Function<P1, P2> furtherGetterForPayload);
    }

    interface ServiceUser<E, P, P1, E2, P2> {
      <S extends BasicServiceOperation<E2, P2, ?>> Setter<E, P, P1> useService(S service);
    }

    interface Setter<E, P, P1> {
      Finalizer<E, P> withSetter(BiConsumer<P, Collection<P1>> biConsumer);
    }

    interface Finalizer<E, P> {
      FieldInclude<E, P> and();

      P get();
    }

  }

  public interface Assigner<E, P> {

    <E1> Mapper<E, P, E1> withGetter(Function<E, E1> function);

    interface Mapper<E, P, E1> {
      <P1> Setter<E, P, P1> map(Function<E1, P1> mapper);
    }

    interface Setter<E, P, P1> {
      Finalizer<E, P> withSetter(BiConsumer<P, P1> biConsumer);
    }

    interface Finalizer<E, P> {
      FieldInclude<E, P> and();

      P get();
    }
  }

}
