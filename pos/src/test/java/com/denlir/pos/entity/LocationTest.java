package com.denlir.pos.entity;

import com.denlir.pos.util.EntityToPayloadTester;
import com.denlir.pos.entity.domain.Location;
import com.denlir.pos.payload.domain.LocationPayload;

import java.util.function.Supplier;

public class LocationTest implements EntityToPayloadTester<Location, LocationPayload> {

    @Override
    public Supplier<LocationPayload> payload() {
        return LocationPayload::new;
    }

    @Override
    public Supplier<Location> entity() {
        return Location::new;
    }

}
