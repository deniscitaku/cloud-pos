package com.denlir.pos.payload.inventory.movement.sale;

import com.denlir.pos.common.GenerateTS;
import com.denlir.pos.entity.inventory.movement.sale.PaymentType;
import com.denlir.pos.entity.inventory.movement.sale.Status;
import com.denlir.pos.payload.BaseAuditPayload;
import com.denlir.pos.payload.domain.LocationPayload;
import com.denlir.pos.validation.groups.ReferenceId;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.groups.ConvertGroup;
import java.math.BigDecimal;
import java.util.Collections;
import java.util.Set;

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

  @NotNull
  private PaymentType paymentType;

  @NotNull
  @PositiveOrZero
  private BigDecimal totalAmount;

  @NotNull
  @PositiveOrZero
  private BigDecimal givenAmount;

  @NotNull
  @Valid
  @ConvertGroup(to = ReferenceId.class)
  private LocationPayload location;

  @NotEmpty
  private Set<@Valid TicketLinePayload> ticketLines;

  private Status status;

  public Set<TicketLinePayload> getTicketLines() {
    return ticketLines == null ? ticketLines = Collections.emptySet() : ticketLines;
  }

}
