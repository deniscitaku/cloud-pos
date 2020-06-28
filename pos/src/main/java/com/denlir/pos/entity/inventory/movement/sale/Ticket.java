package com.denlir.pos.entity.inventory.movement.sale;

import com.denlir.pos.entity.BaseAuditEntity;
import com.denlir.pos.entity.domain.Location;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created on: 3/4/20
 *
 * @author Denis Citaku
 **/
@Data
@EqualsAndHashCode(callSuper = true)
@Document("tickets")
public class Ticket extends BaseAuditEntity {

  @Indexed
  private String sequence;

  private PaymentType paymentType;

  private BigDecimal totalAmount;

  private BigDecimal givenAmount;

  @DBRef
  private Location location;

  @DBRef
  private List<TicketLine> ticketLines;

  private TicketStatus status;

}
