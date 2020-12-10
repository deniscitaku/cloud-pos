package com.denlir.pos.service.domain;

import com.denlir.pos.entity.domain.Location;
import com.denlir.pos.entity.inventory.movement.MovementKind;
import com.denlir.pos.payload.domain.LocationMapper;
import com.denlir.pos.payload.domain.LocationPayload;
import com.denlir.pos.payload.domain.SequenceHolderFluentBuilder;
import com.denlir.pos.repository.domain.LocationRepository;
import com.denlir.pos.service.BasicServiceOperation;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Stream;

/**
 * Created on: 4/11/20
 *
 * @author Denis Citaku
 **/
@Service
public class LocationService extends BasicServiceOperation<Location, LocationPayload, LocationRepository> {

  protected LocationService(LocationRepository repository, LocationMapper locationMapper) {
    super(locationMapper, repository);
  }

  @Override
  protected LocationPayload beforeSave(LocationPayload payload) {
    if (payload.getId() != null) {
      return payload;
    }

    Stream.of(MovementKind.values())
        .forEach(x -> payload.addSequenceHolder(SequenceHolderFluentBuilder.builder()
            .movementKind(x)
            .sequence(1L)
            .build()));

    return payload;
  }
}
