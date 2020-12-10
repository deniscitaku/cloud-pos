package com.denlir.pos.controller.inventory;

import com.denlir.pos.common.GenerateTS;
import com.denlir.pos.controller.BasicControllerOperations;
import com.denlir.pos.payload.inventory.SubCategoryPayload;
import com.denlir.pos.service.inventory.SubCategoryService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@GenerateTS
@RestController
@RequestMapping("inventory/sub-category")
public class SubCategoryController extends BasicControllerOperations<SubCategoryService, SubCategoryPayload> {

  protected SubCategoryController(SubCategoryService service) {
    super(service);
  }

}
