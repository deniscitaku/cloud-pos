package com.denlir.pos.common;

import java.lang.annotation.ElementType;
import java.lang.annotation.Target;

/**
 * Annotation used to generate TypeScript classes from POJO-s that are annotated with {@link com.denlir.common.GenerateTypeScript}
 *
 * @author Denis Citaku
 **/
@Target(value = ElementType.TYPE)
public @interface GenerateTS {
}
