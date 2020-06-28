package com.denlir.pos.exception.controller;

import com.denlir.pos.exception.EntityDatabaseValidationException;
import com.denlir.pos.exception.ValidationExceptionPayload;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.support.WebExchangeBindException;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Created on: 3/14/20
 *
 * @author Denis Citaku
 **/
@RestControllerAdvice
public class ExceptionHandlerControllerAdvice {

  @ExceptionHandler(WebExchangeBindException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public Mono<Map<String, List<ValidationExceptionPayload>>> handleConstraintViolationException(WebExchangeBindException ex) {
    var errors = Map.of("errors", ex.getBindingResult()
            .getAllErrors()
            .stream()
            .map(x -> (FieldError) x)
            .map(x -> ValidationExceptionPayload.builder()
                    .fieldName(x.getField())
                    .rejectedValue(x.getRejectedValue())
                    .errorMessage(x.getDefaultMessage())
                    .errorCode(x.getCode())
                    .build())
            .collect(Collectors.toList()));

    return Mono.just(errors);
  }

  @ExceptionHandler(EntityDatabaseValidationException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public Mono<Map<String, ValidationExceptionPayload>> handleEntityDatabaseValidationException(EntityDatabaseValidationException ex) {
    return Mono.just(Map.of("errors", ex.getValidationExceptionPayload()));
  }

}
