package com.denlir.pos.validation.validators;

import com.denlir.pos.exception.EntityValidationException;
import com.denlir.pos.exception.ValidationExceptionFluentBuilder;
import com.denlir.pos.payload.BasePayload;
import lombok.AllArgsConstructor;

import java.util.function.BiFunction;
import java.util.function.Function;

import static lombok.AccessLevel.PRIVATE;

@AllArgsConstructor(access = PRIVATE)
public class UniqueValidator<R, P> {

  private final R repository;

  private final P payload;

  public static <R, P> UniqueValidator<R, P> of(R repository, P payload) {
    return new UniqueValidator<>(repository, payload);
  }

  public ValidationStages<R, P> onCreate(BiFunction<R, P, Boolean> onCreateValidation) {
    return getValidationBuilder(this, onCreateValidation);
  }

  private ValidationStages<R, P> getValidationBuilder(UniqueValidator<R, P> thisValidator, BiFunction<R, P, Boolean> onCreateValidation) {
    return onUpdateValidation -> (ValidationStages.Stage1<R, P>) name -> new ValidationStages.Stage2<>() {
      @Override
      public <T> ValidationStages.FinalStage<R, P> withValue(Function<P, T> function) {
        return new ValidationStages.FinalStage<>() {
          @Override
          public void end() {
            executeValidation();
          }

          @Override
          public UniqueValidator<R, P> and() {
            executeValidation();
            return thisValidator;
          }

          private void executeValidation() {
            if (((BasePayload) payload).getId() == null) {
              boolean validator = onCreateValidation.apply(repository, payload);
              if (validator) {
                throw duplicateFieldException(name, function.apply(payload));
              }
            } else {
              boolean validator = onUpdateValidation.apply(repository, payload);
              if (validator) {
                throw duplicateFieldException(name, function.apply(payload));
              }
            }
          }
        };
      }
    };
  }

  private EntityValidationException duplicateFieldException(String fieldName, Object rejectedValue) {
    return ValidationExceptionFluentBuilder.builder()
        .fieldName(fieldName)
        .rejectedValue(rejectedValue)
        .message("must not be duplicate")
        .code(fieldName + ".duplicate")
        .build()
        .toEntityValidationException();
  }

  public interface ValidationStages<R, P> {

    Stage1<R, P> onUpdate(BiFunction<R, P, Boolean> onUpdateValidation);

    interface Stage1<R, P> {
      Stage2<R, P> withName(String name);
    }

    interface Stage2<R, P> {
      <T> FinalStage<R, P> withValue(Function<P, T> function);
    }

    interface FinalStage<R, P> {

      void end();

      UniqueValidator<R, P> and();

    }
  }

}
