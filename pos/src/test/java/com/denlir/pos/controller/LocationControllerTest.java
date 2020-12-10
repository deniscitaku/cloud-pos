package com.denlir.pos.controller;

import com.denlir.pos.payload.domain.LocationPayload;
import com.denlir.pos.service.BasicServiceOperation;
import com.denlir.pos.service.domain.LocationService;
import com.denlir.pos.util.ControllerTester;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.function.BiFunction;
import java.util.function.Supplier;


public class LocationControllerTest extends ControllerTester<LocationPayload> {

  @Autowired
  LocationService locationService;

  @Override
  public Supplier<LocationPayload> payload() {
    return () -> {
      LocationPayload payload = new LocationPayload();
      payload.setName("Sample Name");
      return payload;
    };
  }

  @Override
  public BiFunction<LocationPayload, Integer, LocationPayload> updateFunction() {
    return (location, integer) -> {
      location.setName(location.getName() + integer);
      return location;
    };
  }

  @Override
  public String basePath() {
    return "domain/location";
  }

  @Override
  public BasicServiceOperation<?, LocationPayload, ?> service() {
    return locationService;
  }

}
