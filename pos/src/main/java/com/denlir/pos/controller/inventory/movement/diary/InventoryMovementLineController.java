package com.denlir.pos.controller.inventory.movement.diary;

import com.denlir.pos.common.GenerateTS;
import com.denlir.pos.controller.BasicControllerOperations;
import com.denlir.pos.payload.inventory.movement.diary.InventoryMovementLinePayload;
import com.denlir.pos.service.inventory.movement.diary.InventoryMovementLineService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@GenerateTS
@RestController
@RequestMapping("inventory/movement/line")
public class InventoryMovementLineController extends BasicControllerOperations<InventoryMovementLineService, InventoryMovementLinePayload> {

  protected InventoryMovementLineController(InventoryMovementLineService service) {
    super(service);
  }

}
