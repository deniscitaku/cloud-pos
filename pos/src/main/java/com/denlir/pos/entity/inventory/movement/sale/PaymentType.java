package com.denlir.pos.entity.inventory.movement.sale;

import com.denlir.pos.common.GenerateTS;
import com.denlir.pos.exception.ValidationExceptionFluentBuilder;
import com.fasterxml.jackson.annotation.JsonCreator;

import java.util.Arrays;
import java.util.stream.Stream;

/**
 * Created on: 3/4/20
 *
 * @author Denis Citaku
 **/
@GenerateTS
public enum PaymentType {
  CASH, CARD;

  @JsonCreator
  public static PaymentType forValue(String value) {
    return Stream.of(values())
        .filter(x -> x.toString().equalsIgnoreCase(value))
        .findFirst()
        .orElseThrow(() -> ValidationExceptionFluentBuilder.builder()
            .fieldName("paymentType")
            .rejectedValue(value)
            .message("PaymentType " + value + " does not exist!\nPossible values are: " + Arrays.toString(PaymentType.values()))
            .code("WrongEnum")
            .build()
            .toEntityValidationException());
  }
}
