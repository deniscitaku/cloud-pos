package com.denlir.pos.controller.inventory;

import com.denlir.pos.common.GenerateTS;
import com.denlir.pos.controller.BasicControllerOperations;
import com.denlir.pos.payload.inventory.ProductPayload;
import com.denlir.pos.service.inventory.ProductService;
import com.denlir.pos.validation.groups.Sale;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@GenerateTS
@RestController
@RequestMapping("inventory/product")
public class ProductController extends BasicControllerOperations<ProductService, ProductPayload> {

  public ProductController(ProductService productService) {
    super(productService);
  }

  @GetMapping("/code/{code}")
  public Mono<ProductPayload> findByCode(@PathVariable String code) {
    return service.findByCode(code);
  }

  @GetMapping
  public Flux<ProductPayload> findByCodeOrName(@RequestParam String codeOrName) {
    return service.findAllByCodeOrName(codeOrName);
  }

  @GetMapping("/stock")
  public Flux<ProductPayload> findAllLowInStock(@RequestParam String locationId) {
    return service.findAllLowInStock(locationId);
  }

  @PostMapping("/sale")
  public Mono<ProductPayload> createFromSale(@RequestBody @Validated(value = {Sale.class}) ProductPayload productPayload) {
    return service.create(productPayload);
  }

  @PutMapping("/sale")
  public Mono<ProductPayload> updateFromSale(@RequestBody @Validated(value = {Sale.class}) ProductPayload productPayload) {
    return service.update(productPayload);
  }

}