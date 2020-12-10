package com.denlir.pos.payload;

import org.mapstruct.Mapping;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.CLASS)
@Mapping(target = "modifiedByUser", ignore = true)
@Mapping(target = "createdByUser", ignore = true)
public @interface IgnoreUserFields {
}
