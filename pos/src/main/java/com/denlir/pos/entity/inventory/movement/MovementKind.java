package com.denlir.pos.entity.inventory.movement;

import com.denlir.pos.exception.ValidationExceptionFluentBuilder;
import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.stream.Stream;

/**
 * Created on: 4/12/20
 *
 * @author Denis Citaku
 **/
public enum MovementKind {

  SALE(-1),

  TRANSFER(-1),

  EXPIRATION(-1),

  WASTE(-1),

  RETURN_SUPPLIER(-1),

  PURCHASE(1),

  REGISTRATION(1);

  @Getter
  private final BigDecimal stockEffect;

  MovementKind(int stockEffect) {
    this.stockEffect = new BigDecimal(stockEffect);
  }

  @JsonCreator
  public static MovementKind forValue(String value) {
    return Stream.of(values())
        .filter(x -> x.toString().equalsIgnoreCase(value))
        .findFirst()
        .orElseThrow(() -> ValidationExceptionFluentBuilder.builder()
            .fieldName("kind")
            .rejectedValue(value)
            .message("MovementKind " + value + " does not exist!\nPossible values are: " + Arrays.toString(values()))
            .code("WrongEnum")
            .build()
            .toEntityValidationException());
  }

}
