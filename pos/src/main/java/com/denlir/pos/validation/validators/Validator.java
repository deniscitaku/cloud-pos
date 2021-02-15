package com.denlir.pos.validation.validators;

import com.denlir.pos.exception.EntityValidationException;
import com.denlir.pos.exception.ValidationExceptionFluentBuilder;
import com.denlir.pos.payload.BasePayload;
import lombok.AllArgsConstructor;

import java.util.function.Function;

import static lombok.AccessLevel.PRIVATE;

@AllArgsConstructor(access = PRIVATE)
public class Validator<P> {

  private final P payload;

  public static <P> Validator<P> of(P payload) {
    return new Validator<>(payload);
  }

  public ValidationStages<P> onCreate(Function<P, Boolean> onCreateValidation) {
    return getValidationBuilder(this, onCreateValidation);
  }

  private ValidationStages<P> getValidationBuilder(Validator<P> thisValidator, Function<P, Boolean> onCreateValidation) {
    return onUpdateValidation -> new ValidationStages.Stage1<>() {
      @Override
      public ValidationStages.FinalStage<P> withException(Function<P, EntityValidationException> exceptionFunction) {
        return new ValidationStages.FinalStage<>() {
          @Override
          public void end() {
            executeValidation();
          }

          @Override
          public Validator<P> and() {
            executeValidation();
            return thisValidator;
          }

          private void executeValidation() {
            if (((BasePayload) payload).getId() == null) {
              boolean validator = onCreateValidation.apply(payload);
              if (validator) {
                throw exceptionFunction.apply(payload);
              }
            } else {
              boolean validator = onUpdateValidation.apply(payload);
              if (validator) {
                throw exceptionFunction.apply(payload);
              }
            }
          }
        };
      }

      @Override
      public ValidationStages.Stage2<P> withName(String name) {
        return new ValidationStages.Stage2<>() {
          @Override
          public <T> ValidationStages.FinalStage<P> withValue(Function<P, T> valueFunction) {
            return new ValidationStages.FinalStage<>() {
              @Override
              public void end() {
                executeValidation();
              }

              @Override
              public Validator<P> and() {
                executeValidation();
                return thisValidator;
              }

              private void executeValidation() {
                if (((BasePayload) payload).getId() == null) {
                  boolean validator = onCreateValidation.apply(payload);
                  if (validator) {
                    throw duplicateFieldException(name, valueFunction.apply(payload));
                  }
                } else {
                  boolean validator = onUpdateValidation.apply(payload);
                  if (validator) {
                    throw duplicateFieldException(name, valueFunction.apply(payload));
                  }
                }
              }
            };
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

  public interface ValidationStages<P> {

    Stage1<P> onUpdate(Function<P, Boolean> onUpdateValidation);

    interface Stage1<P> {
      FinalStage<P> withException(Function<P, EntityValidationException> exceptionFunction);
      Stage2<P> withName(String name);
    }

    interface Stage2<P> {
      <T> FinalStage<P> withValue(Function<P, T> valueFunction);
    }

    interface FinalStage<P> {

      void end();

      Validator<P> and();

    }
  }

}
