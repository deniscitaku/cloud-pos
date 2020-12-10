package com.denlir.pos.payload.inventory.movement.sale;

import annotation.FluentBuilder;
import com.denlir.pos.common.GenerateTS;
import com.denlir.pos.payload.BaseAuditPayload;
import com.denlir.pos.validation.ValidName;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;

@GenerateTS
@Data
@EqualsAndHashCode(callSuper = true)
@FluentBuilder
public class CustomerPayload extends BaseAuditPayload {

  @ValidName
  private String name;

  private String email;

  private String phoneNumber;

  private BigDecimal currentDebt;

  private BigDecimal maxDebt;

  private Integer discount;

}
