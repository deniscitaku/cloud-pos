package com.denlir.pos.util;

import org.junit.jupiter.api.Test;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Collections;
import java.util.List;
import java.util.function.Predicate;
import java.util.function.Supplier;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

public interface EntityToPayloadTester<E, P> {

  Supplier<E> entity();

  Supplier<P> payload();

  default List<String> excludedFields() {
    return Collections.emptyList();
  }

  default Stream<String> excludeSettersForFields() {
    return Stream.empty();
  }

  @Test
  default void entityFieldsAreSameAsPayload() {
    E entity = entity().get();
    P payload = payload().get();

    String[] entityFields = Stream.of(entity.getClass().getDeclaredFields())
        .map(Field::getName)
        .toArray(String[]::new);

    String[] payloadFields = Stream.of(payload.getClass().getDeclaredFields())
        .map(Field::getName)
        .filter(x -> !excludedFields().contains(x))
        .toArray(String[]::new);

    assertThat(entityFields).containsExactlyInAnyOrder(payloadFields);
  }

  @Test
  default void everyFieldHasGettersAndSetters() {
    E entity = entity().get();
    P payload = payload().get();

    Predicate<String> isGetter = x -> x.startsWith("get") || x.startsWith("is");
    Predicate<String> isSetter = x -> x.startsWith("set");

    List<String> entityGettersAndSetters = Stream.of(entity.getClass().getDeclaredMethods())
        .map(Method::getName)
        .filter(isGetter.or(isSetter))
        .collect(Collectors.toList());

    List<String> payloadGettersAndSetters = Stream.of(payload.getClass().getDeclaredMethods())
        .map(Method::getName)
        .filter(isGetter.or(isSetter))
        .filter(x -> excludeSettersForFields().noneMatch(x::endsWith))
        .collect(Collectors.toList());

    assertEquals(entityGettersAndSetters, payloadGettersAndSetters);
  }

}
