package com.denlir.pos.exception;

import com.denlir.pos.common.GenerateTS;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
@GenerateTS
public class ValidationExceptionPayload {

    private String fieldName;

    private Object rejectedValue;

    private String errorMessage;

    private String errorCode;

    public EntityDatabaseValidationException toEntityDatabaseValidationException() {
        return new EntityDatabaseValidationException(this);
    }

}

