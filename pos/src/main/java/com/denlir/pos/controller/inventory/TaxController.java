package com.denlir.pos.controller.inventory;

import com.denlir.pos.common.GenerateTS;
import com.denlir.pos.controller.BasicControllerOperations;
import com.denlir.pos.payload.inventory.TaxPayload;
import com.denlir.pos.service.inventory.TaxService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created on: 4/12/20
 *
 * @author Denis Citaku
 **/
@GenerateTS
@RestController
@RequestMapping("inventory/tax")
public class TaxController extends BasicControllerOperations<TaxService, TaxPayload> {

  protected TaxController(TaxService service) {
    super(service);
  }

}
