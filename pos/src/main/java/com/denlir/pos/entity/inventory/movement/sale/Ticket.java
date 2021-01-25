package com.denlir.pos.entity.inventory.movement.sale;

import com.denlir.pos.entity.BaseAuditEntity;
import com.denlir.pos.entity.domain.Location;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import java.math.BigDecimal;
import java.util.List;

import static javax.persistence.CascadeType.ALL;
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

  @Enumerated(STRING)
  private PaymentType paymentType;

  private BigDecimal totalAmount;

  private BigDecimal givenAmount;

  @OneToOne
  @JoinColumn
  private Location location;

  @OneToMany(orphanRemoval = true, cascade = ALL, fetch = EAGER)
  @JoinColumn(name = "ticket_id", nullable = false)
  private List<TicketLine> ticketLines;

  @Enumerated(STRING)
  private Status status;

}
