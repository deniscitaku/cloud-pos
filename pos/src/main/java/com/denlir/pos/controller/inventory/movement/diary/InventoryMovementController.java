package com.denlir.pos.controller.inventory.movement.diary;

import com.denlir.pos.common.GenerateTS;
import com.denlir.pos.controller.BasicControllerOperations;
import com.denlir.pos.entity.inventory.movement.MovementKind;
import com.denlir.pos.entity.inventory.movement.sale.Status;
import com.denlir.pos.payload.inventory.movement.diary.InventoryMovementLinePayload;
import com.denlir.pos.payload.inventory.movement.diary.InventoryMovementPayload;
import com.denlir.pos.payload.inventory.movement.sale.TicketLinePayload;
import com.denlir.pos.payload.inventory.movement.sale.TicketPayload;
import com.denlir.pos.service.inventory.movement.diary.InventoryMovementService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotEmpty;
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

  @GetMapping("/{kind}")
  public Collection<InventoryMovementPayload> findByKind(@PathVariable @NotEmpty MovementKind kind) {
    try {
      Thread.sleep(1000);
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
    return service.findByKind(kind);
  }

  @GetMapping("/{kind}/{status}")
  public Collection<InventoryMovementPayload> findByKindAndStatus(@PathVariable MovementKind kind, @PathVariable Status status) {
    try {
      Thread.sleep(1000);
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
    return service.findByKindAndStatus(kind, status);
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
