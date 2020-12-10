package com.denlir.pos.controller.inventory.movement.sale;

import com.denlir.pos.common.GenerateTS;
import com.denlir.pos.controller.BasicControllerOperations;
import com.denlir.pos.payload.inventory.movement.sale.CustomerPayload;
import com.denlir.pos.service.inventory.movement.sale.CustomerService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@GenerateTS
@RestController
@RequestMapping("inventory/movement/sale/customer")
public class CustomerController extends BasicControllerOperations<CustomerService, CustomerPayload> {

  protected CustomerController(CustomerService service) {
    super(service);
  }

}
