package com.denlir.pos.controller.inventory;

import com.denlir.pos.common.GenerateTS;
import com.denlir.pos.controller.BasicControllerOperations;
import com.denlir.pos.payload.inventory.ProductPayload;
import com.denlir.pos.service.inventory.ProductService;
import com.denlir.pos.validation.groups.Partial;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.Collection;
import java.util.List;

@GenerateTS
@RestController
@RequestMapping("inventory/product")
public class ProductController extends BasicControllerOperations<ProductService, ProductPayload> {

  public ProductController(ProductService productService) {
    super(productService);
  }

  @GetMapping("/code/{code}")
  public ProductPayload findByCode(@PathVariable String code) {
    return service.findByCode(code);
  }

  @GetMapping
  public Collection<ProductPayload> findByCodeOrName(@RequestParam String codeOrName) {
    return service.findAllByCodeOrName(codeOrName);
  }

  @GetMapping("/category/{categoryId}")
  public List<ProductPayload> findByCategoryId(@PathVariable Long categoryId) {
    return service.findAllByCategoryId(categoryId);
  }

  @GetMapping("/sub-category/{subCategoryId}")
  public List<ProductPayload> findBySubCategoryId(@PathVariable Long subCategoryId) {
    return service.findAllBySubCategoryId(subCategoryId);
  }

  @PostMapping("/sale")
  public ProductPayload saveFromSale(@RequestBody @Validated(value = {Partial.class}) ProductPayload productPayload) {
    return service.save(productPayload);
  }

}