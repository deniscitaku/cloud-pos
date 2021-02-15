package com.denlir.pos.controller;

import com.denlir.pos.entity.inventory.movement.sale.PaymentType;
import com.denlir.pos.entity.inventory.movement.sale.Status;
import com.denlir.pos.payload.domain.LocationFluentBuilder;
import com.denlir.pos.payload.domain.UserFluentBuilder;
import com.denlir.pos.payload.inventory.CategoryFluentBuilder;
import com.denlir.pos.payload.inventory.ProductFluentBuilder;
import com.denlir.pos.payload.inventory.TaxFluentBuilder;
import com.denlir.pos.payload.inventory.UomFluentBuilder;
import com.denlir.pos.payload.inventory.movement.sale.TicketLineFluentBuilder;
import com.denlir.pos.payload.inventory.movement.sale.TicketPayload;
import com.denlir.pos.service.BasicServiceOperation;
import com.denlir.pos.service.domain.LocationService;
import com.denlir.pos.service.domain.UserService;
import com.denlir.pos.service.inventory.CategoryService;
import com.denlir.pos.service.inventory.ProductService;
import com.denlir.pos.service.inventory.TaxService;
import com.denlir.pos.service.inventory.UomService;
import com.denlir.pos.service.inventory.movement.sale.TicketService;
import com.denlir.pos.util.ControllerTester;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.function.BiFunction;
import java.util.function.Supplier;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class TicketControllerTest extends ControllerTester<TicketPayload> {

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

  @Autowired
  private LocationService locationService;

  @Autowired
  private TicketService ticketService;

  @Override
  public Supplier<TicketPayload> payload() {
    var locationPayload = locationService.findAll()
        .stream()
        .findFirst()
        .orElseGet(() -> locationService.save(LocationFluentBuilder.builder().name("Location 1").build()));

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

    var productPayload = productService.findAll()
        .stream()
        .findFirst()
        .orElseGet(() -> {
          var product = ProductFluentBuilder.builder()
              .code("1231111")
              .name("Product name")
              .priceBuy(BigDecimal.ONE)
              .priceSell(new BigDecimal(1.2))
              .priceTax(new BigDecimal(1.5))
              .category(categoryPayload)
              .subCategory(null)
              .tax(taxPayload)
              .displayName("Product")
              .uoms(Set.of(uomPayload))
              .minStock(new BigDecimal(5))
              .stock(BigDecimal.TEN)
              .modifiedByUser(userPayload)
              .createdByUser(userPayload)
              .build();

          return productService.save(product);
        });

    var ticketLinePayload = TicketLineFluentBuilder.builder()
        .lineNumber(1)
        .product(productPayload)
        .priceBuy(BigDecimal.ONE)
        .priceSell(new BigDecimal(1.2))
        .quantity(new BigDecimal(1))
        .amount(new BigDecimal(1.2))
        .tax(taxPayload)
        .uom(uomPayload);

    var ticketLinePayload1 = TicketLineFluentBuilder.builder()
        .lineNumber(2)
        .product(productPayload)
        .priceBuy(BigDecimal.ONE)
        .priceSell(new BigDecimal(1.2))
        .quantity(new BigDecimal(1))
        .amount(new BigDecimal(1.2))
        .tax(taxPayload)
        .uom(uomPayload);

    return () -> {
      TicketPayload ticketPayload = new TicketPayload();
      ticketPayload.setPaymentType(PaymentType.CASH);
      ticketPayload.setTotalAmount(new BigDecimal(2.4));
      ticketPayload.setGivenAmount(new BigDecimal(5));
      ticketPayload.setLocation(locationPayload);
      ticketPayload.setTicketLines(List.of(ticketLinePayload, ticketLinePayload1));
      ticketPayload.setModifiedByUser(userPayload);
      ticketPayload.setCreatedByUser(userPayload);
      return ticketPayload;
    };
  }

  @Override
  public BiFunction<TicketPayload, Integer, TicketPayload> updateFunction() {
    return (ticket, integer) -> {
      ticket.setStatus(Status.OPENED);
      return ticket;
    };
  }

  @Override
  public String basePath() {
    return "inventory/movement/ticket";
  }

  @Override
  public BasicServiceOperation<?, TicketPayload, ?> service() {
    return ticketService;
  }

  public Stream<Supplier<?>> expectNullFieldsWhenRead(TicketPayload payload) {
    return Stream.of(payload::getCreatedByUser, payload::getModifiedByUser, () -> payload.getTicketLines().stream()
        .map(x -> x.getProduct().getUoms())
        .filter(Objects::nonNull)
        .collect(Collectors.toList()));
  }
}
