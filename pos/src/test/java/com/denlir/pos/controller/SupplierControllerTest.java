package com.denlir.pos.controller;

import com.denlir.pos.payload.inventory.movement.diary.SupplierFluentBuilder;
import com.denlir.pos.payload.inventory.movement.diary.SupplierPayload;
import com.denlir.pos.service.BasicServiceOperation;
import com.denlir.pos.service.inventory.movement.diary.SupplierService;
import com.denlir.pos.util.ControllerTester;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.function.BiFunction;
import java.util.function.Supplier;

public class SupplierControllerTest extends ControllerTester<SupplierPayload> {

  @Autowired
  private SupplierService supplierService;

  @Override
  public Supplier<SupplierPayload> payload() {
    return () -> SupplierFluentBuilder.builder()
        .name("Diarti")
        .nui("180923919203123")
        .phoneNumber("044-193-421")
        .email("diart@gmail.com")
        .build();
  }

  @Override
  public BiFunction<SupplierPayload, Integer, SupplierPayload> updateFunction() {
    return (supplier, integer) -> {
      supplier.setName(supplier.getName() + " " + integer);
      return supplier;
    };
  }

  @Override
  public String basePath() {
    return "inventory/movement/supplier";
  }

  @Override
  public BasicServiceOperation<?, SupplierPayload, ?> service() {
    return supplierService;
  }

}
