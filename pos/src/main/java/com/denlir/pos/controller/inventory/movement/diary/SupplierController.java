package com.denlir.pos.controller.inventory.movement.diary;

import com.denlir.pos.common.GenerateTypeScript;
import com.denlir.pos.controller.BasicControllerOperations;
import com.denlir.pos.payload.inventory.movement.diary.SupplierPayload;
import com.denlir.pos.service.inventory.movement.diary.SupplierService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created on: 4/13/20
 *
 * @author Denis Citaku
 **/
@GenerateTypeScript
@RestController
@RequestMapping("inventory/movement/supplier")
public class SupplierController extends BasicControllerOperations<SupplierService, SupplierPayload> {

  protected SupplierController(SupplierService service) {
    super(service);
  }

}
