package com.denlir.pos.entity;

import com.denlir.pos.entity.inventory.movement.MovementKind;
import com.denlir.pos.entity.inventory.movement.diary.InventoryMovement;
import com.denlir.pos.payload.domain.LocationPayload;
import com.denlir.pos.payload.inventory.movement.diary.InventoryMovementPayload;
import com.denlir.pos.util.EntityToPayloadTester;
import org.junit.jupiter.api.Test;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.Set;
import java.util.function.Supplier;

public class InventoryMovementTest implements EntityToPayloadTester<InventoryMovement, InventoryMovementPayload> {

  ValidatorFactory factory = Validation.buildDefaultValidatorFactory();

  @Test
  public void validInventoryMovement() {
    Validator validator = factory.getValidator();

    var location = new LocationPayload();
    location.setId(1L);

    InventoryMovementPayload imp = new InventoryMovementPayload();
    imp.setKind(MovementKind.PURCHASE);
    imp.setLocation(location);
    Set<ConstraintViolation<InventoryMovementPayload>> violations = validator.validate(imp);
    for (ConstraintViolation<InventoryMovementPayload> violation : violations) {
    }

  }

  @Override
  public Supplier<InventoryMovement> entity() {
    return InventoryMovement::new;
  }

  @Override
  public Supplier<InventoryMovementPayload> payload() {
    return InventoryMovementPayload::new;
  }
}
