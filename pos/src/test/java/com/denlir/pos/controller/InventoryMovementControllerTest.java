package com.denlir.pos.controller;

import com.denlir.pos.entity.inventory.movement.MovementKind;
import com.denlir.pos.payload.domain.LocationFluentBuilder;
import com.denlir.pos.payload.domain.LocationPayload;
import com.denlir.pos.payload.inventory.movement.diary.InventoryMovementFluentBuilder;
import com.denlir.pos.payload.inventory.movement.diary.InventoryMovementPayload;
import com.denlir.pos.service.BasicServiceOperation;
import com.denlir.pos.service.domain.LocationService;
import com.denlir.pos.service.inventory.movement.diary.InventoryMovementService;
import com.denlir.pos.util.ControllerTester;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.function.BiFunction;
import java.util.function.Supplier;

public class InventoryMovementControllerTest extends ControllerTester<InventoryMovementPayload> {

  @Autowired
  private InventoryMovementService inventoryMovementService;

  @Autowired
  private LocationService locationService;

  @Override
  public Supplier<InventoryMovementPayload> payload() {
    LocationPayload location = locationService.findAll()
        .stream()
        .findFirst()
        .orElseGet(() -> locationService.save(LocationFluentBuilder.builder().name("Location").build()));

    InventoryMovementPayload imp = new InventoryMovementPayload();
    imp.setKind(MovementKind.PURCHASE);
    imp.setLocation(location);

    return () -> imp;
  }

  @Override
  public BiFunction<InventoryMovementPayload, Integer, InventoryMovementPayload> updateFunction() {
    return null;
  }

  @Override
  public String basePath() {
    return "inventory/movement";
  }

  @Override
  public BasicServiceOperation<?, InventoryMovementPayload, ?> service() {
    return inventoryMovementService;
  }
}
