package com.denlir.pos.service.inventory.movement.diary;

import com.denlir.pos.entity.inventory.movement.diary.InventoryMovementLine;
import com.denlir.pos.payload.inventory.movement.diary.InventoryMovementLineMapper;
import com.denlir.pos.payload.inventory.movement.diary.InventoryMovementLinePayload;
import com.denlir.pos.repository.inventory.movement.diary.InventoryMovementLineRepository;
import com.denlir.pos.service.BasicServiceOperation;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import java.math.BigDecimal;

/**
 * Created on: 4/13/20
 *
 * @author Denis Citaku
 **/
@Service
public class InventoryMovementLineService extends BasicServiceOperation<InventoryMovementLine, InventoryMovementLinePayload, InventoryMovementLineRepository> {

  protected InventoryMovementLineService(InventoryMovementLineMapper inventoryMovementLineMapper, InventoryMovementLineRepository repository) {
    super(inventoryMovementLineMapper, repository);
  }

  @Override
  protected InventoryMovementLinePayload beforeSave(InventoryMovementLinePayload payload) {
    BigDecimal priceBuy = payload.getProduct().getPriceBuy();
    BigDecimal priceSell = payload.getProduct().getPriceSell();

    payload.setPriceBuy(priceBuy);
    payload.setPriceSell(priceSell);
    payload.setAmount(priceBuy.multiply(payload.getQuantity()));
    payload.setTax(payload.getProduct().getTax());

    return payload;
  }
}
