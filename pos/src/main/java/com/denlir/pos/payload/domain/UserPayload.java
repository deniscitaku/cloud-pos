package com.denlir.pos.payload.domain;

import annotation.FluentBuilder;
import com.denlir.pos.common.GenerateTS;
import com.denlir.pos.payload.BasePayload;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.constraints.NotEmpty;
import java.time.LocalDateTime;

import static annotation.FluentBuilder.*;

/**
 * Created on: 4/13/20
 *
 * @author Denis Citaku
 **/
@EqualsAndHashCode(callSuper = true)
@Data
@FluentBuilder
@GenerateTS
public class UserPayload extends BasePayload {

  @NotEmpty
  private String name;

  @Optional
  private String phoneNumber;

  @Optional
  private String email;

  @Optional
  private LocalDateTime createdOn;

  @Optional
  private LocalDateTime updatedOn;

}
