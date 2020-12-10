package com.denlir.pos.entity;

import com.denlir.pos.entity.inventory.Stock;
import com.denlir.pos.payload.inventory.StockPayload;
import com.denlir.pos.util.EntityToPayloadTester;

import java.util.function.Supplier;

public class StockTest implements EntityToPayloadTester<Stock, StockPayload> {
  @Override
  public Supplier<Stock> entity() {
    return Stock::new;
  }

  @Override
  public Supplier<StockPayload> payload() {
    return StockPayload::new;
  }
}
