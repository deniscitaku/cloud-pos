package com.denlir.pos.payload.inventory.movement.sale;

import com.denlir.pos.common.GenerateTypeScript;
import com.denlir.pos.entity.inventory.movement.sale.PaymentType;
import com.denlir.pos.entity.inventory.movement.sale.TicketStatus;
import com.denlir.pos.payload.BaseAuditPayload;
import com.denlir.pos.payload.domain.LocationPayload;
import lombok.*;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;

/**
 * Created on: 3/5/20
 *
 * @author Denis Citaku
 **/
@Data
@EqualsAndHashCode(callSuper = true)
@GenerateTypeScript
public class TicketPayload extends BaseAuditPayload {

  private String sequence;

  private PaymentType paymentType;

  private BigDecimal totalAmount;

  private BigDecimal givenAmount;

  private LocationPayload location;

  private List<TicketLinePayload> ticketLines;

  private TicketStatus status;

  public List<TicketLinePayload> getTicketLines() {
    return ticketLines == null ? ticketLines = Collections.emptyList() : ticketLines;
  }

}
