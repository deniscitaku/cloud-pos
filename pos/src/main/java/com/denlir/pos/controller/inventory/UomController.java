package com.denlir.pos.controller.inventory;

import com.denlir.pos.common.GenerateTypeScript;
import com.denlir.pos.controller.BasicControllerOperations;
import com.denlir.pos.payload.inventory.UomPayload;
import com.denlir.pos.service.inventory.UomService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created on: 4/12/20
 *
 * @author Denis Citaku
 **/
@GenerateTypeScript
@RestController
@RequestMapping("inventory/uom")
public class UomController extends BasicControllerOperations<UomService, UomPayload> {

  protected UomController(UomService service) {
    super(service);
  }

}
