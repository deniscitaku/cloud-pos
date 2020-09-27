package com.denlir.pos.exception.controller;

import com.denlir.pos.exception.EntityValidationException;
import com.denlir.pos.exception.ValidationExceptionPayload;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.support.WebExchangeBindException;
import reactor.core.publisher.Mono;

import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

/**
 * Created on: 3/14/20
 *
 * @author Denis Citaku
 **/
@RestControllerAdvice
public class ExceptionHandlerControllerAdvice {

  private static final Pattern pattern = Pattern.compile("(\\.[A-Za-z])");

  @ExceptionHandler(WebExchangeBindException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public Mono<Map<String, ?>> handleConstraintViolationException(WebExchangeBindException ex) {

    var errors = ex.getBindingResult()
        .getAllErrors()
        .stream()
        .map(x -> (FieldError) x)
        .map(this::buildValidationExceptionPayload)
        .collect(Collectors.groupingBy(ValidationExceptionPayload::getFieldName));

    return Mono.just(errors);
  }

  @ExceptionHandler(EntityValidationException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public Mono<Map<String, ValidationExceptionPayload>> handleEntityDatabaseValidationException(EntityValidationException ex) {
    return Mono.just(Map.of(fieldNameCorrecter(ex.getValidationExceptionPayload().getFieldName()), ex.getValidationExceptionPayload()));
  }

  private static String fieldNameCorrecter(String fieldName) {
    Matcher matcher = pattern.matcher(fieldName);
    if (matcher.find()) {
      return matcher.replaceAll(x -> x.group(1).replace(".", "").toUpperCase());
    }
    return fieldName;
  }

  private ValidationExceptionPayload buildValidationExceptionPayload(FieldError fieldError) {
    ValidationExceptionPayload vep = ValidationExceptionPayload.builder().build();
    return recursiveValidationExceptionFiller(fieldError, fieldError.getField(), vep, vep, false, true);
  }

  private ValidationExceptionPayload recursiveValidationExceptionFiller(FieldError fieldError,
                                                                        String fieldName,
                                                                        ValidationExceptionPayload first,
                                                                        ValidationExceptionPayload innerNode,
                                                                        boolean hasInnerNode,
                                                                        boolean isFirst) {
    if (fieldName.contains(".")) {
      fieldName = fieldName.substring(fieldName.indexOf('.') + 1);
      if (isFirst) {
        recursiveValidationExceptionFiller(fieldError, fieldName, first, innerNode, true, false);
      }
      ValidationExceptionPayload next = ValidationExceptionPayload.builder().build();
      innerNode.setInnerError(Map.of(fieldName, next));
      recursiveValidationExceptionFiller(fieldError, fieldName, first, next, true, false);
    }

    if (hasInnerNode) {
      fillValidationException(fieldError, fieldName, innerNode);
      return first;
    }

    return fillValidationException(fieldError, fieldError.getField(), first);
  }

  private ValidationExceptionPayload fillValidationException(FieldError fieldError, String fieldName, ValidationExceptionPayload vep) {
    vep.setFieldName(getFirstField(fieldName));
    vep.setCode(fieldError.getCode());
    vep.setMessage(fieldError.getDefaultMessage());
    vep.setRejectedValue(fieldError.getRejectedValue());
    return vep;
  }

  private String getFirstField(String fullPath) {
    if (fullPath.contains(".")) {
      return fullPath.substring(0, fullPath.indexOf('.'));
    }

    return fullPath;
  }

}
