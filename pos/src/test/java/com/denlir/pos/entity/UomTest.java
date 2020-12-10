package com.denlir.pos.entity;

import com.denlir.pos.entity.inventory.Uom;
import com.denlir.pos.payload.inventory.UomPayload;
import com.denlir.pos.util.EntityToPayloadTester;

import java.util.function.Supplier;

public class UomTest implements EntityToPayloadTester<Uom, UomPayload> {
  @Override
  public Supplier<Uom> entity() {
    return Uom::new;
  }

  @Override
  public Supplier<UomPayload> payload() {
    return UomPayload::new;
  }
}
