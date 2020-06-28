package com.denlir.pos.exception;

import com.denlir.pos.common.GenerateTypeScript;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
@GenerateTypeScript
public class ValidationExceptionPayload {

    private String fieldName;

    private Object rejectedValue;

    private String errorMessage;

    private String errorCode;

    public EntityDatabaseValidationException toEntityDatabaseValidationException() {
        return new EntityDatabaseValidationException(this);
    }

}

