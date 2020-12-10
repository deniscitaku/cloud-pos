package com.denlir.pos.entity;

import com.denlir.pos.entity.inventory.movement.diary.InventoryMovementLine;
import com.denlir.pos.payload.inventory.movement.diary.InventoryMovementLinePayload;
import com.denlir.pos.util.EntityToPayloadTester;

import java.util.function.Supplier;

public class InventoryMovementLineTest implements EntityToPayloadTester<InventoryMovementLine, InventoryMovementLinePayload> {
  @Override
  public Supplier<InventoryMovementLine> entity() {
    return InventoryMovementLine::new;
  }

  @Override
  public Supplier<InventoryMovementLinePayload> payload() {
    return InventoryMovementLinePayload::new;
  }
}
