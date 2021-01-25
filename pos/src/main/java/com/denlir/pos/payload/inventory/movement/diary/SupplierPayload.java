package com.denlir.pos.payload.inventory.movement.diary;

import annotation.FluentBuilder;
import annotation.FluentBuilder.Optional;
import com.denlir.pos.common.GenerateTS;
import com.denlir.pos.payload.BaseAuditPayload;
import com.denlir.pos.validation.ValidName;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

/**
 * Created on: 4/13/20
 *
 * @author Denis Citaku
 **/
@FluentBuilder
@Data
@EqualsAndHashCode(callSuper = true)
@GenerateTS
public class SupplierPayload extends BaseAuditPayload {

  @ValidName
  private String name;

  @Optional
  private String nui;

  @Optional
  private String phoneNumber;

  @Optional
  private String email;

}
