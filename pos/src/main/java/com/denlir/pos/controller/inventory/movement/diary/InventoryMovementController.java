package com.denlir.pos.controller.inventory.movement.diary;

import com.denlir.pos.common.GenerateTS;
import com.denlir.pos.controller.BasicControllerOperations;
import com.denlir.pos.entity.inventory.movement.MovementKind;
import com.denlir.pos.payload.inventory.movement.diary.InventoryMovementPayload;
import com.denlir.pos.service.inventory.movement.diary.InventoryMovementService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import javax.validation.constraints.NotEmpty;
import javax.ws.rs.QueryParam;

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
  public Flux<InventoryMovementPayload> findByKind(@PathVariable @NotEmpty MovementKind kind) {
    return service.findByKind(kind);
  }

}
