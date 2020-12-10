package com.denlir.pos.controller;

import com.denlir.pos.payload.inventory.CategoryFluentBuilder;
import com.denlir.pos.payload.inventory.CategoryPayload;
import com.denlir.pos.service.BasicServiceOperation;
import com.denlir.pos.service.inventory.CategoryService;
import com.denlir.pos.util.ControllerTester;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.function.BiFunction;
import java.util.function.Supplier;

public class CategoryControllerTest extends ControllerTester<CategoryPayload> {

  @Autowired
  private CategoryService service;

  @Override
  public Supplier<CategoryPayload> payload() {
    return () -> CategoryFluentBuilder.builder().name("Devices").build();
  }

  @Override
  public BiFunction<CategoryPayload, Integer, CategoryPayload> updateFunction() {
    return (categoryPayload, integer) -> {
      categoryPayload.setName(categoryPayload.getName() + " " + integer);
      return categoryPayload;
    };
  }

  @Override
  public String basePath() {
    return "inventory/category";
  }

  @Override
  public BasicServiceOperation<?, CategoryPayload, ?> service() {
    return service;
  }
}
