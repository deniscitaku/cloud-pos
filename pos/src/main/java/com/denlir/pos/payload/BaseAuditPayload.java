package com.denlir.pos.payload;

import com.denlir.pos.common.GenerateTS;
import com.denlir.pos.payload.domain.UserPayload;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

import static annotation.FluentBuilder.Optional;
import static java.lang.Integer.MAX_VALUE;

/**
 * Created on: 4/13/20
 *
 * @author Denis Citaku
 **/
@GenerateTS
@Data
@EqualsAndHashCode(callSuper = true)
public abstract class BaseAuditPayload extends BasePayload {

  @Optional(order = MAX_VALUE - 4)
  private UserPayload modifiedByUser;

  @Optional(order = MAX_VALUE - 3)
  private UserPayload createdByUser;

  @Optional(order = MAX_VALUE - 2)
  private LocalDateTime createdOn;

  @Optional(order = MAX_VALUE - 1)
  private LocalDateTime updatedOn;

}

