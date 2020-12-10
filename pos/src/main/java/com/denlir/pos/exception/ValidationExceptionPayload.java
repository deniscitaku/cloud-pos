package com.denlir.pos.exception;

import annotation.FluentBuilder;
import com.denlir.pos.common.GenerateTS;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@FluentBuilder
@Data
@GenerateTS
public class ValidationExceptionPayload {

    private String fieldName;

    private Object rejectedValue;

    private String message;

    private String code;

    @FluentBuilder.Optional
    private Map<String, ValidationExceptionPayload> innerError;

    public EntityValidationException toEntityValidationException() {
        return new EntityValidationException(this);
    }

}

