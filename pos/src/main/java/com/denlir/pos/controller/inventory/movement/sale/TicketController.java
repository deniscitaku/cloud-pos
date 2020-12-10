package com.denlir.pos.controller.inventory.movement.sale;

import com.denlir.pos.common.GenerateTS;
import com.denlir.pos.controller.BasicControllerOperations;
import com.denlir.pos.payload.domain.LocationPayload;
import com.denlir.pos.payload.inventory.movement.sale.TicketPayload;
import com.denlir.pos.service.inventory.movement.sale.TicketService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

  @GetMapping("/{locationId}/open")
  public TicketPayload openTicket(@PathVariable Long locationId) {
    return service.openTicket(locationId);
  }

}
