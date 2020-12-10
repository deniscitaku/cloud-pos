package com.denlir.pos.entity.inventory.movement.sale;

import com.denlir.pos.common.GenerateTS;
import com.denlir.pos.exception.ValidationExceptionFluentBuilder;
import com.fasterxml.jackson.annotation.JsonCreator;

import java.util.Arrays;
import java.util.stream.Stream;

@GenerateTS
public enum Status {
    OPENED, CLOSED;

    @JsonCreator
    public static Status forValue(String value) {
        return Stream.of(values())
            .filter(x -> x.toString().equalsIgnoreCase(value))
            .findFirst()
            .orElseThrow(() -> ValidationExceptionFluentBuilder.builder()
                .fieldName("status")
                .rejectedValue(value)
                .message("Status " + value + " does not exist!\nPossible values are: " + Arrays.toString(values()))
                .code("WrongEnum")
                .build()
                .toEntityValidationException());
    }
}
