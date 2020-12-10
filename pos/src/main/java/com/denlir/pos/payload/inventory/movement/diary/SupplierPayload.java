package com.denlir.pos.payload.inventory.movement.diary;

import annotation.FluentBuilder;
import annotation.FluentBuilder.Optional;
import com.denlir.pos.common.GenerateTS;
import com.denlir.pos.payload.BaseAuditPayload;
import lombok.Data;
import lombok.EqualsAndHashCode;

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

  private String name;

  @Optional
  private String nui;

  @Optional
  private String phoneNumber;

  @Optional
  private String email;

}
