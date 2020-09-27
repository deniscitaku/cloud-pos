package com.denlir.pos.service.inventory.movement.diary;

import com.denlir.pos.entity.inventory.movement.MovementKind;
import com.denlir.pos.entity.inventory.movement.diary.InventoryMovement;
import com.denlir.pos.payload.domain.LocationPayload;
import com.denlir.pos.payload.inventory.movement.diary.InventoryMovementMapper;
import com.denlir.pos.payload.inventory.movement.diary.InventoryMovementPayload;
import com.denlir.pos.payload.inventory.movement.sale.TicketPayload;
import com.denlir.pos.repository.inventory.movement.diary.InventoryMovementRepository;
import com.denlir.pos.service.BasicServiceOperation;
import com.denlir.pos.service.domain.LocationService;
import com.denlir.pos.service.inventory.StockService;
import org.springframework.data.mongodb.core.ReactiveMongoOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.util.function.Tuple2;

import java.math.BigDecimal;
import java.util.stream.Collectors;

/**
 * Created on: 4/13/20
 *
 * @author Denis Citaku
 **/
@Service
public class InventoryMovementService extends
    BasicServiceOperation<InventoryMovement, InventoryMovementPayload, InventoryMovementRepository> {

  private final InventoryMovementLineService inventoryMovementLineService;

  private final LocationService locationService;

  private final StockService stockService;

  protected InventoryMovementService(InventoryMovementMapper inventoryMovementMapper,
                                     InventoryMovementRepository repository,
                                     ReactiveMongoOperations reactiveOps,
                                     InventoryMovementLineService inventoryMovementLineService,
                                     LocationService locationService,
                                     StockService stockService) {
    super(inventoryMovementMapper, repository, reactiveOps);
    this.inventoryMovementLineService = inventoryMovementLineService;
    this.locationService = locationService;
    this.stockService = stockService;
  }

  public Flux<InventoryMovementPayload> findByKind(MovementKind kind) {
    return repository.findByKind(kind)
        .map(mapper::entityToPayload);
  }

  @Override
  @Transactional
  public Mono<InventoryMovementPayload> create(InventoryMovementPayload payload) {
    return Flux.zip(
        stockService.updateStock(payload.getInventoryMovementLines(), payload.getLocation().getId(), payload.getKind()),
        inventoryMovementLineService.insertAll(payload.getInventoryMovementLines()))
        .map(Tuple2::getT2)
        .collect(Collectors.toList())
        .zipWith(locationService.getAndIncrementSequenceByIdAndMovementKind(payload.getLocation().getId(), payload.getKind()))
        .map(x -> {
          payload.setInventoryMovementLines(x.getT1());
          payload.setSequence(String.valueOf(x.getT2()));
          return payload;
        })
        .flatMap(x -> repository.save(mapper.payloadToEntity(x)))
        .map(mapper::entityToPayload);
  }

}
