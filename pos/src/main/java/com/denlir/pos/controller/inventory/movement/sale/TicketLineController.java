package com.denlir.pos.controller.inventory.movement.sale;

import com.denlir.pos.common.GenerateTS;
import com.denlir.pos.controller.BasicControllerOperations;
import com.denlir.pos.payload.inventory.movement.sale.TicketLinePayload;
import com.denlir.pos.service.inventory.movement.sale.TicketLineService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created on: 2/29/20
 *
 * @author Denis Citaku
 **/
@GenerateTS
@RestController
@RequestMapping("inventory/movement/ticket-line")
public class TicketLineController extends BasicControllerOperations<TicketLineService, TicketLinePayload> {

  public TicketLineController(TicketLineService ticketLineService) {
    super(ticketLineService);
  }

}
