package com.denlir.pos.service.inventory.movement.sale;

import com.denlir.pos.entity.inventory.movement.MovementKind;
import com.denlir.pos.entity.inventory.movement.sale.Ticket;
import com.denlir.pos.payload.domain.LocationPayload;
import com.denlir.pos.payload.inventory.movement.sale.TicketMapper;
import com.denlir.pos.payload.inventory.movement.sale.TicketPayload;
import com.denlir.pos.repository.inventory.movement.sale.TicketRepository;
import com.denlir.pos.service.BasicServiceOperation;
import com.denlir.pos.service.domain.LocationService;
import com.denlir.pos.service.inventory.StockService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.ReactiveMongoOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.util.function.Tuple2;

import java.math.BigDecimal;
import java.util.stream.Collectors;

/**
 * Created on: 4/10/20
 *
 * @author Denis Citaku
 **/
@Slf4j
@Service
public class TicketService extends BasicServiceOperation<Ticket, TicketPayload, TicketRepository> {

  private final StockService stockService;

  private final TicketLineService ticketLineService;

  private final LocationService locationService;

  protected TicketService(TicketRepository repository,
                           ReactiveMongoOperations reactiveOps,
                           StockService stockService,
                           TicketLineService ticketLineService, LocationService locationService) {
    super(TicketMapper.INSTANCE, repository, reactiveOps);
    this.stockService = stockService;
    this.ticketLineService = ticketLineService;
    this.locationService = locationService;
  }

  @Override
  //@Transactional
  public Mono<TicketPayload> update(TicketPayload payload) {
    return Flux.zip(
        stockService.updateStock(payload.getTicketLines(), payload.getLocation().getId(), MovementKind.SALE),
        ticketLineService.insertAll(payload.getTicketLines()))
        .map(Tuple2::getT2)
        .collect(Collectors.toList())
        .map(x -> {
          payload.setTicketLines(x);
          return payload;
        })
        .flatMap(x -> repository.save(mapper.payloadToEntity(x)))
        .map(mapper::entityToPayload);
  }

    public Mono<TicketPayload> openTicket(String locationId) {
        return locationService.getAndIncrementSequenceByIdAndMovementKind(locationId, MovementKind.SALE)
                .map(x -> {
                    LocationPayload location = new LocationPayload();
                    location.setId(locationId);
                    TicketPayload ticket = new TicketPayload();
                    ticket.setSequence(x.toString());
                    ticket.setLocation(location);
                    ticket.setTotalAmount(BigDecimal.ZERO);
                    return ticket;
                });
    }
}
