package com.denlir.pos.controller.inventory;

import com.denlir.pos.common.GenerateTS;
import com.denlir.pos.controller.BasicControllerOperations;
import com.denlir.pos.payload.inventory.CategoryPayload;
import com.denlir.pos.service.inventory.CategoryService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created on: 4/12/20
 *
 * @author Denis Citaku
 **/
@GenerateTS
@RestController
@RequestMapping("inventory/category")
public class CategoryController extends BasicControllerOperations<CategoryService, CategoryPayload> {

  protected CategoryController(CategoryService service) {
    super(service);
  }

}
