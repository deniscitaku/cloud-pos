package com.denlir.pos.exception;

import com.denlir.pos.common.GenerateTS;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Builder
@Getter
@Setter
@GenerateTS
public class ValidationExceptionPayload {

    private String fieldName;

    private Object rejectedValue;

    private String message;

    private String code;

    private Map<String, ValidationExceptionPayload> innerError;

    public EntityValidationException toEntityValidationException() {
        return new EntityValidationException(this);
    }

}

