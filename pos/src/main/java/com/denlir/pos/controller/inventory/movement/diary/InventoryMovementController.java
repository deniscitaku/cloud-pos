package com.denlir.pos.controller.inventory.movement.diary;

import com.denlir.pos.common.GenerateTS;
import com.denlir.pos.controller.BasicControllerOperations;
import com.denlir.pos.entity.inventory.movement.MovementKind;
import com.denlir.pos.entity.inventory.movement.diary.InventoryMovement;
import com.denlir.pos.entity.inventory.movement.sale.Status;
import com.denlir.pos.payload.domain.PagePayload;
import com.denlir.pos.payload.inventory.movement.diary.InventoryMovementLinePayload;
import com.denlir.pos.payload.inventory.movement.diary.InventoryMovementPayload;
import com.denlir.pos.payload.inventory.movement.sale.TicketLinePayload;
import com.denlir.pos.payload.inventory.movement.sale.TicketPayload;
import com.denlir.pos.service.inventory.movement.diary.InventoryMovementService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotEmpty;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;

/**
 * Created on: 4/13/20
 *
 * @author Denis Citaku
 **/
@GenerateTS
@RestController
@RequestMapping("inventory/movement")
public class InventoryMovementController extends BasicControllerOperations<InventoryMovementService, InventoryMovementPayload> {

  protected InventoryMovementController(InventoryMovementService service) {
    super(service);
  }

  @GetMapping("/kind/{kind}")
  public PagePayload<InventoryMovementPayload> findAllPagedByKind(
      @PathVariable MovementKind kind,
      @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate from,
      @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate to,
      @RequestParam(required = false) Long supplierId,
      @RequestParam(required = false) String... include) {
    try {
      Thread.sleep(1000);
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
    return service.findAllByKindAndCreatedOnBetweenAndSupplierId(kind, from, to, supplierId, include);
  }

  @GetMapping("/kind/{kind}/status/{status}")
  public InventoryMovementPayload findByKindAndStatus(@PathVariable MovementKind kind,
                                                      @PathVariable Status status,
                                                      @RequestParam(required = false) String... include) {
    try {
      Thread.sleep(1000);
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
    return service.findByKindAndStatus(kind, status, include);
  }

  @PostMapping("/{locationId}/{kind}/open")
  public InventoryMovementPayload openInventoryMovement(@PathVariable Long locationId, @PathVariable String kind) {
    try {
      Thread.sleep(1000);
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
    return service.openInventoryMovement(locationId, kind);
  }

  @PutMapping("/close")
  public InventoryMovementPayload closeInventoryMovement(@RequestBody @Validated InventoryMovementPayload payload) {
    try {
      Thread.sleep(1000);
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
    return service.closeInventoryMovement(payload);
  }

  @PutMapping("/{inventoryMovementId}/add-line")
  public InventoryMovementPayload addInventoryMovementLine(@PathVariable Long inventoryMovementId,
                                                           @RequestBody @Validated InventoryMovementLinePayload inventoryMovementLine) {
    try {
      Thread.sleep(1000);
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
    return service.addInventoryMovementLine(inventoryMovementId, inventoryMovementLine);
  }

}
