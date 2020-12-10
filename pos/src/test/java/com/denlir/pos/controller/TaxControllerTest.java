package com.denlir.pos.controller;

import com.denlir.pos.payload.inventory.TaxFluentBuilder;
import com.denlir.pos.payload.inventory.TaxPayload;
import com.denlir.pos.service.BasicServiceOperation;
import com.denlir.pos.service.inventory.TaxService;
import com.denlir.pos.util.ControllerTester;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigDecimal;
import java.util.function.BiFunction;
import java.util.function.Supplier;

public class TaxControllerTest extends ControllerTester<TaxPayload> {

  @Autowired
  private TaxService taxService;

  @Override
  public Supplier<TaxPayload> payload() {
    return () -> TaxFluentBuilder.builder()
        .name("18%")
        .taxRate(new BigDecimal(1.18))
        .isDefault(false)
        .build();
  }

  @Override
  public BiFunction<TaxPayload, Integer, TaxPayload> updateFunction() {
    return (tax, integer) -> {
      tax.setName(integer + "%");
      tax.setTaxRate(new BigDecimal("1." + integer));
      return tax;
    };
  }

  @Override
  public String basePath() {
    return "inventory/tax";
  }

  @Override
  public BasicServiceOperation<?, TaxPayload, ?> service() {
    return taxService;
  }
}
