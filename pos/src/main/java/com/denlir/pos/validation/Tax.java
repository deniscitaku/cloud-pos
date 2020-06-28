package com.denlir.pos.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import javax.validation.ReportAsSingleViolation;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
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
@Size(max = 4)
@Pattern(regexp = "\\d{1,2}\\%")
@Constraint(validatedBy = {})
@Target({METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface Tax {
  String message() default "must be in '--%' format";
  Class<?>[] groups() default {};
  Class<? extends Payload>[] payload() default {};
}
