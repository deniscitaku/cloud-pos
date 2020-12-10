package com.denlir.pos.controller;

import com.denlir.pos.payload.domain.UserFluentBuilder;
import com.denlir.pos.payload.inventory.*;
import com.denlir.pos.payload.inventory.CategoryFluentBuilder;
import com.denlir.pos.payload.inventory.ProductFluentBuilder;
import com.denlir.pos.payload.inventory.TaxFluentBuilder;
import com.denlir.pos.payload.inventory.UomFluentBuilder;
import com.denlir.pos.service.BasicServiceOperation;
import com.denlir.pos.service.domain.UserService;
import com.denlir.pos.service.inventory.CategoryService;
import com.denlir.pos.service.inventory.ProductService;
import com.denlir.pos.service.inventory.TaxService;
import com.denlir.pos.service.inventory.UomService;
import com.denlir.pos.util.ControllerTester;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigDecimal;
import java.util.Set;
import java.util.function.BiFunction;
import java.util.function.Supplier;
import java.util.stream.Stream;

public class ProductControllerTest extends ControllerTester<ProductPayload> {

  @Autowired
  private ProductService productService;

  @Autowired
  private UserService userService;

  @Autowired
  private CategoryService categoryService;

  @Autowired
  private TaxService taxService;

  @Autowired
  private UomService uomService;

  @Override
  public Supplier<ProductPayload> payload() {
    var userPayload = userService.findAll()
        .stream()
        .findFirst()
        .orElseGet(() -> userService.save(UserFluentBuilder.builder().name("Denis").build()));

    var categoryPayload = categoryService.findAll()
        .stream()
        .findFirst()
        .orElseGet(() -> categoryService.save(CategoryFluentBuilder.builder().name("Cigarettes").build()));

    var taxPayload = taxService.findAll()
        .stream()
        .findFirst()
        .orElseGet(() -> taxService.save(TaxFluentBuilder.builder().name("18%").taxRate(new BigDecimal(1.18)).isDefault(false).build()));

    var uomPayload = uomService.findAll()
        .stream()
        .findFirst()
        .orElseGet(() -> uomService.save(UomFluentBuilder.builder().smallerUnitName("Unit").biggerUnitName("Package").convertValue(BigDecimal.TEN).build()));

    return () -> ProductFluentBuilder.builder()
        .code("1231231231")
        .name("Lucky strike blue")
        .priceBuy(new BigDecimal(1.5))
        .priceSell(new BigDecimal(1.8))
        .priceTax(new BigDecimal(2))
        .category(categoryPayload)
        .subCategory(null)
        .tax(taxPayload)
        .displayName("Lucky Strike")
        .uoms(Set.of(uomPayload))
        .minStock(new BigDecimal(5))
        .modifiedByUser(userPayload)
        .createdByUser(userPayload)
        .build();
  }

  @Override
  public BiFunction<ProductPayload, Integer, ProductPayload> updateFunction() {
    return (product, integer) -> {
      product.setCode(product.getCode() + integer);
      product.setName(product.getName() + " " + integer);
      return product;
    };
  }

  @Override
  public String basePath() {
    return "inventory/product";
  }

  @Override
  public BasicServiceOperation<?, ProductPayload, ?> service() {
    return productService;
  }

  @Override
  public Stream<Supplier<?>> expectNullFieldsWhenRead(ProductPayload payload) {
    return Stream.of(payload::getCreatedByUser, payload::getModifiedByUser, payload::getUoms);
  }
}
