package com.denlir.pos.entity;

import com.denlir.pos.entity.inventory.movement.sale.Ticket;
import com.denlir.pos.payload.inventory.movement.sale.TicketPayload;
import com.denlir.pos.util.EntityToPayloadTester;

import java.util.function.Supplier;

public class TicketTest implements EntityToPayloadTester<Ticket, TicketPayload> {
  @Override
  public Supplier<Ticket> entity() {
    return Ticket::new;
  }

  @Override
  public Supplier<TicketPayload> payload() {
    return TicketPayload::new;
  }
}
