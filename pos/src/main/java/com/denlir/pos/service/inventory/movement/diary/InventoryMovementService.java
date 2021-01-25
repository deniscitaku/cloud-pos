package com.denlir.pos.service.inventory.movement.diary;

import com.denlir.pos.entity.inventory.movement.MovementKind;
import com.denlir.pos.entity.inventory.movement.diary.InventoryMovement;
import com.denlir.pos.entity.inventory.movement.sale.Status;
import com.denlir.pos.payload.domain.LocationPayload;
import com.denlir.pos.payload.inventory.movement.diary.InventoryMovementLinePayload;
import com.denlir.pos.payload.inventory.movement.diary.InventoryMovementMapper;
import com.denlir.pos.payload.inventory.movement.diary.InventoryMovementPayload;
import com.denlir.pos.payload.inventory.movement.sale.TicketLinePayload;
import com.denlir.pos.payload.inventory.movement.sale.TicketPayload;
import com.denlir.pos.repository.inventory.movement.diary.InventoryMovementRepository;
import com.denlir.pos.service.BasicServiceOperation;
import com.denlir.pos.service.domain.SequenceHolderService;
import com.denlir.pos.service.inventory.StockService;
import com.denlir.pos.validation.validators.UniqueValidator;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collection;

/**
 * Created on: 4/13/20
 *
 * @author Denis Citaku
 **/
@Service
public class InventoryMovementService extends
    BasicServiceOperation<InventoryMovement, InventoryMovementPayload, InventoryMovementRepository> {

  private final InventoryMovementLineService inventoryMovementLineService;

  private final SequenceHolderService sequenceHolderService;

  private final StockService stockService;

  protected InventoryMovementService(InventoryMovementMapper inventoryMovementMapper,
                                     InventoryMovementRepository repository,
                                     InventoryMovementLineService inventoryMovementLineService,
                                     SequenceHolderService sequenceHolderService,
                                     StockService stockService) {
    super(inventoryMovementMapper, repository);
    this.inventoryMovementLineService = inventoryMovementLineService;
    this.sequenceHolderService = sequenceHolderService;
    this.stockService = stockService;
  }

  public Collection<InventoryMovementPayload> findByKind(MovementKind kind) {
    return mapper.partialEntitiesToPayloads(repository.findByKind(kind));
  }

  public Collection<InventoryMovementPayload> findByKindAndStatus(MovementKind kind, Status status) {
    return mapper.partialEntitiesToPayloads(repository.findByKindAndStatusOrderByUpdatedOn(kind, status));
  }

  @Transactional
  public InventoryMovementPayload openInventoryMovement(Long locationId, String kind) {
    LocationPayload locationPayload = new LocationPayload();
    locationPayload.setId(locationId);

    InventoryMovementPayload payload = new InventoryMovementPayload();
    payload.setLocation(locationPayload);
    payload.setKind(MovementKind.forValue(kind));
    payload.setStatus(Status.OPENED);

    return save(payload);
  }

  @Transactional
  public InventoryMovementPayload closeInventoryMovement(InventoryMovementPayload inventoryMovementPayload) {
    inventoryMovementPayload.setStatus(Status.CLOSED);
    return save(inventoryMovementPayload);
  }

  @Transactional
  public InventoryMovementPayload addInventoryMovementLine(Long inventoryMovementId, InventoryMovementLinePayload inventoryMovementLine) {
    InventoryMovementPayload inventoryMovement = getOne(inventoryMovementId);

    InventoryMovementLinePayload iml = inventoryMovementLineService.beforeSave(inventoryMovementLine);
    iml.setLineNumber(inventoryMovement.getInventoryMovementLines().size() + 1);
    inventoryMovement.getInventoryMovementLines().add(iml);

    return save(inventoryMovement);
  }

  @Override
  public InventoryMovementPayload beforeSave(InventoryMovementPayload payload) {
    Long locationId = payload.getLocation().getId();

    if (payload.getSequence() == null) {
      Long sequence = sequenceHolderService.getAndIncrementSequenceByIdAndMovementKind(locationId, payload.getKind());
      payload.setSequence(sequence);
    }

    if (payload.getStatus() == Status.CLOSED) {
      stockService.updateStock(payload.getInventoryMovementLines(), locationId, payload.getKind());
    }

    return payload;
  }

}
