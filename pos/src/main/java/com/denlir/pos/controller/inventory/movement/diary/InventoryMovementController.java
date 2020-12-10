package com.denlir.pos.controller.inventory.movement.diary;

import com.denlir.pos.common.GenerateTS;
import com.denlir.pos.controller.BasicControllerOperations;
import com.denlir.pos.entity.inventory.movement.MovementKind;
import com.denlir.pos.payload.inventory.movement.diary.InventoryMovementPayload;
import com.denlir.pos.service.inventory.movement.diary.InventoryMovementService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
    return service.findByKind(kind);
  }

  @PostMapping("/{locationId}/{kind}/open")
  public InventoryMovementPayload openInventoryMovement(@PathVariable Long locationId, @PathVariable String kind) {
    return service.openInventoryMovement(locationId, kind);
  }

}
