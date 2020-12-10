package com.denlir.pos.entity;

import com.denlir.pos.entity.inventory.Tax;
import com.denlir.pos.payload.inventory.TaxPayload;
import com.denlir.pos.util.EntityToPayloadTester;

import java.util.function.Supplier;

public class TaxTest implements EntityToPayloadTester<Tax, TaxPayload> {

  @Override
  public Supplier<Tax> entity() {
    return Tax::new;
  }

  @Override
  public Supplier<TaxPayload> payload() {
    return TaxPayload::new;
  }

}
