package com.denlir.pos.entity;

import com.denlir.pos.entity.inventory.movement.sale.TicketLine;
import com.denlir.pos.payload.inventory.movement.sale.TicketLinePayload;
import com.denlir.pos.util.EntityToPayloadTester;

import java.util.function.Supplier;

public class TicketLineTest implements EntityToPayloadTester<TicketLine, TicketLinePayload> {
  @Override
  public Supplier<TicketLine> entity() {
    return TicketLine::new;
  }

  @Override
  public Supplier<TicketLinePayload> payload() {
    return TicketLinePayload::new;
  }
}
