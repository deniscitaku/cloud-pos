package com.denlir.pos.entity;

import com.denlir.pos.entity.inventory.movement.diary.Supplier;
import com.denlir.pos.payload.inventory.movement.diary.SupplierPayload;
import com.denlir.pos.util.EntityToPayloadTester;

public class SupplierTest implements EntityToPayloadTester<Supplier, SupplierPayload> {
  @Override
  public java.util.function.Supplier<Supplier> entity() {
    return Supplier::new;
  }

  @Override
  public java.util.function.Supplier<SupplierPayload> payload() {
    return SupplierPayload::new;
  }
}
