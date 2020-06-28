package com.denlir.pos.validation;

import com.denlir.pos.validation.validators.DecimalRangeValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

/**
 * Created on: 3/14/20
 *
 * @author Denis Citaku
 **/
@Constraint(validatedBy = {DecimalRangeValidator.class})
@Target({METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER})
@Retention(RUNTIME)
public @interface DecimalRange {

  String message() default "Decimal value must be between {min} and {max}";
  Class<?>[] groups() default {};
  Class<? extends Payload>[] payload() default {};

  double min() default Double.MIN_VALUE;
  double max() default Double.MAX_VALUE;

}
