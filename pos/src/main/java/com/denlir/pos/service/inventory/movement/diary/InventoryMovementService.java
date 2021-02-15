package com.denlir.pos.service.inventory.movement.diary;

import com.denlir.pos.entity.inventory.StockId;
import com.denlir.pos.entity.inventory.movement.MovementKind;
import com.denlir.pos.entity.inventory.movement.diary.InventoryMovement;
import com.denlir.pos.entity.inventory.movement.sale.Status;
import com.denlir.pos.payload.domain.LocationPayload;
import com.denlir.pos.payload.domain.PagePayload;
import com.denlir.pos.payload.inventory.BaseLinePayload;
import com.denlir.pos.payload.inventory.ProductPayload;
import com.denlir.pos.payload.inventory.StockPayload;
import com.denlir.pos.payload.inventory.movement.diary.InventoryMovementLinePayload;
import com.denlir.pos.payload.inventory.movement.diary.InventoryMovementMapper;
import com.denlir.pos.payload.inventory.movement.diary.InventoryMovementPayload;
import com.denlir.pos.repository.inventory.movement.diary.InventoryMovementRepository;
import com.denlir.pos.service.BasicServiceOperation;
import com.denlir.pos.service.FieldInclude;
import com.denlir.pos.service.domain.SequenceHolderService;
import com.denlir.pos.service.inventory.StockService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import static com.denlir.pos.service.FieldInclude.ofEntityAndMapper;

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

  public InventoryMovementPayload findByKindAndStatus(MovementKind kind, Status status, String... includeFields) {
    return repository.findFirstByKindAndStatus(kind, status)
        .map(x -> {
          InventoryMovementPayload inventoryMovementPayload = includeFields(ofEntityAndMapper(x, mapper, includeFields));
          Collections.sort(inventoryMovementPayload.getInventoryMovementLines());
          return inventoryMovementPayload;
        })
        .orElse(null);
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

    // Check if this line already exists, if so then just add that quantity, or else add it and set it's line number
    inventoryMovement.getInventoryMovementLines().stream()
        .filter(x -> x.getProduct().getId().equals(inventoryMovementLine.getProduct().getId()))
        .findFirst()
        .ifPresentOrElse(x -> {
          x.setQuantity(x.getQuantity().add(inventoryMovementLine.getQuantity()));
          inventoryMovementLineService.beforeSave(x);
        }, () -> {
          InventoryMovementLinePayload iml = inventoryMovementLineService.beforeSave(inventoryMovementLine);
          iml.setLineNumber(inventoryMovement.getInventoryMovementLines().size() + 1);
          inventoryMovement.getInventoryMovementLines().add(iml);
        });

    InventoryMovementPayload savedInventoryMovementPayload = save(inventoryMovement);
    Collections.sort(savedInventoryMovementPayload.getInventoryMovementLines());
    stockService.findById(new StockId(inventoryMovement.getLocation().getId(), inventoryMovementLine.getProduct().getId()))
        .ifPresent(x -> savedInventoryMovementPayload.getInventoryMovementLines()
            .get(inventoryMovement.getInventoryMovementLines().size() - 1)
            .getProduct()
            .setStock(x.getUnits()));

    return savedInventoryMovementPayload;
  }

  public PagePayload<InventoryMovementPayload> findAllByKindAndCreatedOnBetweenAndSupplierId(MovementKind kind, LocalDate from, LocalDate to, Long supplierId, String... includeFields) {
    var pageWithSearch = repository.findAllByKindAndStatusAndDateBetweenAndSupplierId(kind,
        Status.CLOSED,
        from.atTime(LocalTime.MIN),
        to.atTime(LocalTime.MAX),
        Optional.ofNullable(supplierId).orElse(0L),
        buildPageRequest(0, 30, "asc", "createdOn"))
        .map(x -> includeFields(ofEntityAndMapper(x, mapper, includeFields)));

    return PagePayload.fromPageable(pageWithSearch);
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

  @Override
  public InventoryMovementPayload includeFields(FieldInclude<InventoryMovement, InventoryMovementPayload> fieldInclude) {
    List<String> includeFields = fieldInclude.getIncludeFields();

    if (includeFields.contains("stock")) {
      Set<StockId> stockIds = fieldInclude.getPayload().getInventoryMovementLines()
          .stream()
          .map(BaseLinePayload::getProduct)
          .map(x -> new StockId(1L, x.getId()))
          .collect(Collectors.toSet());

      Collection<StockPayload> stocksById = stockService.findAllById(stockIds);

      fieldInclude.getPayload()
          .getInventoryMovementLines()
          .forEach(x -> {
            ProductPayload product = x.getProduct();
            stocksById.stream()
                .filter(y -> y.getStockId().getProductId().equals(product.getId()))
                .findFirst()
                .ifPresent(y -> product.setStock(y.getUnits()));
          });
    }

    return fieldInclude.getPayload();
  }
}
