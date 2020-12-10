package com.denlir.pos.controller;

import com.denlir.pos.payload.inventory.UomFluentBuilder;
import com.denlir.pos.payload.inventory.UomPayload;
import com.denlir.pos.service.BasicServiceOperation;
import com.denlir.pos.service.inventory.UomService;
import com.denlir.pos.util.ControllerTester;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigDecimal;
import java.util.function.BiFunction;
import java.util.function.Supplier;

public class UomControllerTest extends ControllerTester<UomPayload> {

  @Autowired
  private UomService service;

  @Override
  public Supplier<UomPayload> payload() {
    return () -> UomFluentBuilder.builder()
        .smallerUnitName("Cope")
        .biggerUnitName("Pako")
        .convertValue(new BigDecimal(12))
        .build();
  }

  @Override
  public BiFunction<UomPayload, Integer, UomPayload> updateFunction() {
    return (uom, i) -> {
      uom.setSmallerUnitName(uom.getSmallerUnitName() + " " + i);
      uom.setBiggerUnitName(uom.getBiggerUnitName() + " " + i);
      uom.setConvertValue(uom.getConvertValue().add(new BigDecimal(i)));
      return uom;
    };
  }

  @Override
  public String basePath() {
    return "inventory/uom";
  }

  @Override
  public BasicServiceOperation<?, UomPayload, ?> service() {
    return service;
  }
}
