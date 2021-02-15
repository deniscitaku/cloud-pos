package com.denlir.pos.service.inventory.movement.sale;

import com.denlir.pos.entity.inventory.BaseLineEntity;
import com.denlir.pos.entity.inventory.movement.MovementKind;
import com.denlir.pos.entity.inventory.movement.sale.PaymentType;
import com.denlir.pos.entity.inventory.movement.sale.Status;
import com.denlir.pos.entity.inventory.movement.sale.Ticket;
import com.denlir.pos.payload.domain.LocationPayload;
import com.denlir.pos.payload.inventory.BaseLinePayload;
import com.denlir.pos.payload.inventory.movement.sale.TicketLinePayload;
import com.denlir.pos.payload.inventory.movement.sale.TicketMapper;
import com.denlir.pos.payload.inventory.movement.sale.TicketPayload;
import com.denlir.pos.repository.inventory.movement.sale.TicketRepository;
import com.denlir.pos.service.BasicServiceOperation;
import com.denlir.pos.service.FieldInclude;
import com.denlir.pos.service.domain.SequenceHolderService;
import com.denlir.pos.service.inventory.ProductService;
import com.denlir.pos.service.inventory.StockService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import static java.util.Map.of;

/**
 * Created on: 4/10/20
 *
 * @author Denis Citaku
 **/
@Slf4j
@Service
public class TicketService extends BasicServiceOperation<Ticket, TicketPayload, TicketRepository> {

  private final StockService stockService;

  private final SequenceHolderService sequenceHolderService;

  private final ProductService productService;

  private final TicketLineService ticketLineService;

  protected TicketService(TicketMapper ticketMapper,
                          TicketRepository repository,
                          StockService stockService,
                          SequenceHolderService sequenceHolderService,
                          ProductService productService,
                          TicketLineService ticketLineService) {
    super(ticketMapper, repository);
    this.stockService = stockService;
    this.sequenceHolderService = sequenceHolderService;
    this.productService = productService;
    this.ticketLineService = ticketLineService;
  }

  public Collection<TicketPayload> findByStatus(Status status) {
    List<TicketPayload> tickets = mapper.partialEntitiesToPayloads(repository.findByStatusOrderByCreatedOn(status));
    tickets.forEach(x -> Collections.sort(x.getTicketLines()));

    return tickets;
  }

  @Transactional
  public TicketPayload openTicket(Long locationId) {
    LocationPayload locationPayload = new LocationPayload();
    locationPayload.setId(locationId);

    TicketPayload ticket = new TicketPayload();
    ticket.setLocation(locationPayload);
    ticket.setStatus(Status.OPENED);

    Long sequence = sequenceHolderService.getAndIncrementSequenceByIdAndMovementKind(locationId, MovementKind.SALE);
    ticket.setSequence(sequence);

    return save(ticket);
  }

  @Transactional
  public TicketPayload closeTicket(TicketPayload payload) {
    if (payload.getGivenAmount() == null) {
      payload.setGivenAmount(payload.getTotalAmount());
    }

    if (payload.getPaymentType() == null) {
      payload.setPaymentType(PaymentType.CASH);
    }

    payload.setStatus(Status.CLOSED);

    return save(payload);
  }

  @Transactional
  public TicketPayload addTicketLine(Long ticketId, TicketLinePayload ticketLine) {
    TicketPayload ticket = getOne(ticketId);

    ticket.getTicketLines().stream()
        .filter(x -> x.getProduct().getId().equals(ticketLine.getProduct().getId()))
        .findFirst()
        .ifPresentOrElse(x -> {
          x.setQuantity(x.getQuantity().add(ticketLine.getQuantity()));
          ticketLineService.beforeSave(x);
        }, () -> {
          TicketLinePayload tl = ticketLineService.beforeSave(ticketLine);
          tl.setLineNumber(ticket.getTicketLines().size() + 1);
          ticket.getTicketLines().add(tl);
        });

    return save(ticket);
  }

  @Override
  protected TicketPayload beforeSave(TicketPayload payload) {
    Long locationId = payload.getLocation().getId();

    if (payload.getStatus() == Status.CLOSED) {
      stockService.updateStock(payload.getTicketLines(), locationId, MovementKind.SALE);
    }

    BigDecimal totalAmount = payload.getTicketLines()
        .stream()
        .map(BaseLinePayload::getAmount)
        .reduce(BigDecimal.ZERO, BigDecimal::add);

    payload.setTotalAmount(totalAmount);

    return payload;
  }

  @Override
  public TicketPayload includeFields(FieldInclude<Ticket, TicketPayload> fieldInclude) {
    return fieldInclude.includeAuditFields()
        .and()
        .mappingFields(of("product-uoms", "uoms", "product-modifiedByUser", "modifiedByUser", "product-createdByUser", "createdByUser"))
        .withGetters(Ticket::getTicketLines, TicketPayload::getTicketLines)
        .furtherGetters(BaseLineEntity::getProduct, BaseLinePayload::getProduct)
        .useService(productService)
        .withSetter((ticket, ticketLines) -> ticket.setTicketLines(new ArrayList<>(ticketLines)))
        .get();
  }
}
