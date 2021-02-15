package com.denlir.pos.service.inventory.movement.diary;

import com.denlir.pos.entity.inventory.movement.MovementKind;
import com.denlir.pos.entity.inventory.movement.diary.InventoryMovementLine;
import com.denlir.pos.exception.EntityValidationException;
import com.denlir.pos.exception.ValidationExceptionFluentBuilder;
import com.denlir.pos.payload.inventory.ProductPayload;
import com.denlir.pos.payload.inventory.movement.diary.InventoryMovementLineMapper;
import com.denlir.pos.payload.inventory.movement.diary.InventoryMovementLinePayload;
import com.denlir.pos.repository.inventory.movement.diary.InventoryMovementLineRepository;
import com.denlir.pos.service.BasicServiceOperation;
import com.denlir.pos.validation.validators.Validator;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

/**
 * Created on: 4/13/20
 *
 * @author Denis Citaku
 **/
@Service
public class InventoryMovementLineService extends BasicServiceOperation<InventoryMovementLine, InventoryMovementLinePayload, InventoryMovementLineRepository> {

  protected InventoryMovementLineService(InventoryMovementLineMapper inventoryMovementLineMapper,
                                         InventoryMovementLineRepository repository) {
    super(inventoryMovementLineMapper, repository);
  }

  @Override
  public InventoryMovementLinePayload save(InventoryMovementLinePayload payload, String... includeFields) throws EntityValidationException {
    BigDecimal stock = payload.getProduct().getStock();
    InventoryMovementLinePayload movementLinePayload = super.save(payload, includeFields);
    movementLinePayload.getProduct().setStock(stock);
    return movementLinePayload;
  }

  @Override
  protected InventoryMovementLinePayload beforeSave(InventoryMovementLinePayload payload) {
    ProductPayload product = payload.getProduct();

    payload.setPriceBuy(product.getPriceBuy());
    payload.setPriceSell(product.getPriceSell());
    payload.setAmount(product.getPriceBuy().multiply(payload.getQuantity()));
    payload.setTax(product.getTax());

    return payload;
  }

  @Override
  protected void validate(Validator<InventoryMovementLinePayload> validator) throws EntityValidationException {
    validator
        .onCreate(p -> p.getKind() != MovementKind.REGISTRATION && p.getQuantity().compareTo(BigDecimal.ZERO) < 0)
        .onUpdate(p -> p.getKind() != MovementKind.REGISTRATION && p.getQuantity().compareTo(BigDecimal.ZERO) < 0)
        .withException(p -> ValidationExceptionFluentBuilder.builder()
            .fieldName("quantity")
            .rejectedValue(p.getQuantity())
            .message("must be greater than 0")
            .code("Positive")
            .build()
            .toEntityValidationException())
        .end();
  }
}
