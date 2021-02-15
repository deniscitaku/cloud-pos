package com.denlir.pos.controller.inventory.movement.sale;

import com.denlir.pos.common.GenerateTS;
import com.denlir.pos.controller.BasicControllerOperations;
import com.denlir.pos.entity.inventory.movement.sale.Status;
import com.denlir.pos.payload.inventory.movement.sale.TicketLinePayload;
import com.denlir.pos.payload.inventory.movement.sale.TicketPayload;
import com.denlir.pos.service.inventory.movement.sale.TicketService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

/**
 * Created on: 4/11/20
 *
 * @author Denis Citaku
 **/
@GenerateTS
@RestController
@RequestMapping("inventory/movement/sale/ticket")
public class TicketController extends BasicControllerOperations<TicketService, TicketPayload> {

  protected TicketController(TicketService service) {
    super(service);
  }

  @GetMapping("/status/{status}")
  public Collection<TicketPayload> findByStatus(@PathVariable Status status) {
    try {
      Thread.sleep(1000);
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
    return service.findByStatus(status);
  }

  @PostMapping("/{locationId}/open")
  public TicketPayload openTicket(@PathVariable Long locationId) {
    try {
      Thread.sleep(1000);
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
    return service.openTicket(locationId);
  }

  @PutMapping("/close")
  public TicketPayload closeTicket(@RequestBody @Validated TicketPayload payload) {
    try {
      Thread.sleep(1000);
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
    return service.closeTicket(payload);
  }

  @PutMapping("/{ticketId}/add-line")
  public TicketPayload addTicketLine(@PathVariable Long ticketId, @RequestBody @Validated TicketLinePayload ticketLine) {
    try {
      Thread.sleep(1000);
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
    return service.addTicketLine(ticketId, ticketLine);
  }
}
