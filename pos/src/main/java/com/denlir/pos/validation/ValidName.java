package com.denlir.pos.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import javax.validation.ReportAsSingleViolation;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;

/**
 * Created on: 3/14/20
 *
 * @author Denis Citaku
 **/
@ReportAsSingleViolation
@NotBlank
@Pattern(regexp = "(\\w|\\s){1,100}")
@Constraint(validatedBy = {})
@Target({METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidName {

  String message() default "must contain word characters and must be between 1 - 100 long.";
  Class<?>[] groups() default {};
  Class<? extends Payload>[] payload() default {};

}
