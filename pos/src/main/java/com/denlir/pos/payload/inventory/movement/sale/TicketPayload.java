package com.denlir.pos.payload.inventory.movement.sale;

import com.denlir.pos.common.GenerateTS;
import com.denlir.pos.entity.inventory.movement.sale.PaymentType;
import com.denlir.pos.entity.inventory.movement.sale.Status;
import com.denlir.pos.payload.BaseAuditPayload;
import com.denlir.pos.payload.domain.LocationPayload;
import com.denlir.pos.validation.groups.Close;
import com.denlir.pos.validation.groups.ReferenceId;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.groups.ConvertGroup;
import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;

/**
 * Created on: 3/5/20
 *
 * @author Denis Citaku
 **/
@Data
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = true)
@GenerateTS
public class TicketPayload extends BaseAuditPayload {

  @NotNull
  @Positive
  private Long sequence;

  private PaymentType paymentType;

  private BigDecimal totalAmount;

  private BigDecimal givenAmount;

  @Valid
  @ConvertGroup(to = ReferenceId.class)
  @NotNull
  private LocationPayload location;

  private List<@Valid TicketLinePayload> ticketLines;

  private Status status;

  public List<TicketLinePayload> getTicketLines() {
    return ticketLines == null ? ticketLines = Collections.emptyList() : ticketLines;
  }

}
