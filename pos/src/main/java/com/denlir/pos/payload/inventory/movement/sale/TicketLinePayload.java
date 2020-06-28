package com.denlir.pos.payload.inventory.movement.sale;

import com.denlir.pos.common.GenerateTypeScript;
import com.denlir.pos.payload.inventory.BaseLinePayload;
import com.denlir.pos.payload.inventory.TaxPayload;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;

/**
 * Created on: 2/29/20
 *
 * @author Denis Citaku
 **/
@GenerateTypeScript
@Data
@EqualsAndHashCode(callSuper = true)
public class TicketLinePayload extends BaseLinePayload {

  private BigDecimal priceSell;

  private TaxPayload tax;

  private BigDecimal amount;

}
