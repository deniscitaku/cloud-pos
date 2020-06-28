package com.denlir.pos.validation.validators;

import com.denlir.pos.validation.DecimalRange;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.math.BigDecimal;

/**
 * Created on: 3/14/20
 *
 * @author Denis Citaku
 **/
public class DecimalRangeValidator implements ConstraintValidator<DecimalRange, BigDecimal> {

  private BigDecimal max;
  private BigDecimal min;

  @Override
  public void initialize(DecimalRange constraintAnnotation) {
    this.max = BigDecimal.valueOf(constraintAnnotation.max());
    this.min = BigDecimal.valueOf(constraintAnnotation.min());
  }

  @Override
  public boolean isValid(BigDecimal value, ConstraintValidatorContext context) {
    if (value == null) return true;
    return value.compareTo(max) < 0 && value.compareTo(min) > 0;
  }
}
