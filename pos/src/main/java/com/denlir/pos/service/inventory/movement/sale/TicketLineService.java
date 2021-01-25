package com.denlir.pos.service.inventory.movement.sale;

import com.denlir.pos.entity.inventory.movement.sale.TicketLine;
import com.denlir.pos.payload.inventory.ProductPayload;
import com.denlir.pos.payload.inventory.movement.sale.TicketLineMapper;
import com.denlir.pos.payload.inventory.movement.sale.TicketLinePayload;
import com.denlir.pos.repository.inventory.movement.sale.TicketLineRepository;
import com.denlir.pos.service.BasicServiceOperation;
import org.springframework.stereotype.Service;

/**
 * Created on: 2/29/20
 *
 * @author Denis Citaku
 **/
@Service
public class TicketLineService extends BasicServiceOperation<TicketLine, TicketLinePayload, TicketLineRepository> {

  protected TicketLineService(TicketLineMapper ticketLineMapper,
                           TicketLineRepository ticketLineRepository) {
    super(ticketLineMapper, ticketLineRepository);
  }

  @Override
  protected TicketLinePayload beforeSave(TicketLinePayload payload) {
    ProductPayload product = payload.getProduct();

    payload.setPriceBuy(product.getPriceBuy());
    payload.setPriceSell(product.getPriceSell());
    payload.setAmount(payload.getQuantity().multiply(product.getPriceTax()));
    payload.setTax(product.getTax());

    return payload;
  }
}
