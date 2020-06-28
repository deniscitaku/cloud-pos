package com.denlir.pos.controller.domain;

import com.denlir.pos.common.GenerateTypeScript;
import com.denlir.pos.controller.BasicControllerOperations;
import com.denlir.pos.payload.domain.LocationPayload;
import com.denlir.pos.service.domain.LocationService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created on: 4/11/20
 *
 * @author Denis Citaku
 **/
@GenerateTypeScript
@RestController
@RequestMapping("domain/location")
public class LocationController extends BasicControllerOperations<LocationService, LocationPayload> {

  protected LocationController(LocationService service) {
    super(service);
  }

}
