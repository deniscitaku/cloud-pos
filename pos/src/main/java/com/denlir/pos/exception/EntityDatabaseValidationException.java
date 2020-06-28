package com.denlir.pos.exception;

import lombok.Getter;
import lombok.NonNull;

@Getter
public class EntityDatabaseValidationException extends RuntimeException {

    private final ValidationExceptionPayload validationExceptionPayload;

    public EntityDatabaseValidationException(@NonNull ValidationExceptionPayload validationExceptionPayload) {
        super(validationExceptionPayload.getErrorMessage());
        this.validationExceptionPayload = validationExceptionPayload;
    }

}
