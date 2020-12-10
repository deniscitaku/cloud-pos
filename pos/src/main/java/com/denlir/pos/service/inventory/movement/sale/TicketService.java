package com.denlir.pos.service.inventory.movement.sale;

import com.denlir.pos.entity.inventory.BaseLineEntity;
import com.denlir.pos.entity.inventory.movement.MovementKind;
import com.denlir.pos.entity.inventory.movement.sale.Ticket;
import com.denlir.pos.exception.ValidationExceptionFluentBuilder;
import com.denlir.pos.payload.domain.LocationPayload;
import com.denlir.pos.payload.inventory.BaseLinePayload;
import com.denlir.pos.payload.inventory.movement.sale.TicketMapper;
import com.denlir.pos.payload.inventory.movement.sale.TicketPayload;
import com.denlir.pos.repository.inventory.movement.sale.TicketRepository;
import com.denlir.pos.service.BasicServiceOperation;
import com.denlir.pos.service.FieldInclude;
import com.denlir.pos.service.domain.LocationService;
import com.denlir.pos.service.domain.SequenceHolderService;
import com.denlir.pos.service.inventory.ProductService;
import com.denlir.pos.service.inventory.StockService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashSet;

import static java.util.Map.*;

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

  private final LocationService locationService;

  protected TicketService(TicketMapper ticketMapper,
                          TicketRepository repository,
                          StockService stockService,
                          SequenceHolderService sequenceHolderService,
                          ProductService productService,
                          LocationService locationService) {
    super(ticketMapper, repository);
    this.stockService = stockService;
    this.sequenceHolderService = sequenceHolderService;
    this.productService = productService;
    this.locationService = locationService;
  }

  public TicketPayload openTicket(Long locationId) {
    LocationPayload location = locationService.findById(locationId).orElseThrow(() -> ValidationExceptionFluentBuilder.builder()
        .fieldName("location")
        .rejectedValue(locationId)
        .message("Location with id: " + locationId + " not found!")
        .code("NotFound")
        .build()
        .toEntityValidationException());

    TicketPayload ticket = new TicketPayload();
    ticket.setLocation(location);

    return save(ticket);
  }

  @Override
  protected TicketPayload beforeSave(TicketPayload payload) {
    Long locationId = payload.getLocation().getId();

    if (payload.getSequence() == null) {
      Long sequence = sequenceHolderService.getAndIncrementSequenceByIdAndMovementKind(locationId, MovementKind.SALE);
      payload.setSequence(sequence);
    }

    stockService.updateStock(payload.getTicketLines(), locationId, MovementKind.SALE);

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
        .withSetter((ticket, ticketLines) -> ticket.setTicketLines(new HashSet<>(ticketLines)))
        .get();
  }

}
