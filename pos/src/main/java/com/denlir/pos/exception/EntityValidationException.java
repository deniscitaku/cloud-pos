package com.denlir.pos.exception;

import lombok.Getter;
import lombok.NonNull;

@Getter
public class EntityValidationException extends RuntimeException {

    private final ValidationExceptionPayload validationExceptionPayload;

    public EntityValidationException(@NonNull ValidationExceptionPayload validationExceptionPayload) {
        super(validationExceptionPayload.getMessage());
        this.validationExceptionPayload = validationExceptionPayload;
    }

}
