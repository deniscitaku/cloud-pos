package com.denlir.pos.entity.inventory.movement.sale;

import com.denlir.pos.entity.BaseAuditEntity;
import com.denlir.pos.entity.domain.Location;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Set;

import static javax.persistence.EnumType.STRING;
import static javax.persistence.FetchType.EAGER;

/**
 * Created on: 3/4/20
 *
 * @author Denis Citaku
 **/
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Ticket extends BaseAuditEntity {

  private Long sequence;

  private PaymentType paymentType;

  private BigDecimal totalAmount;

  private BigDecimal givenAmount;

  @OneToOne
  @JoinColumn
  private Location location;

  @OneToMany(orphanRemoval = true, cascade = CascadeType.ALL, fetch = EAGER)
  @JoinColumn(name = "ticket_id", nullable = false)
  private Set<TicketLine> ticketLines;

  @Enumerated(STRING)
  private Status status;

}
