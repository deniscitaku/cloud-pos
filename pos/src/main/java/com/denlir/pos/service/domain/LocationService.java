package com.denlir.pos.service.domain;

import com.denlir.pos.entity.domain.Location;
import com.denlir.pos.entity.inventory.movement.MovementKind;
import com.denlir.pos.payload.domain.LocationMapper;
import com.denlir.pos.payload.domain.LocationPayload;
import com.denlir.pos.repository.domain.LocationRepository;
import com.denlir.pos.service.BasicServiceOperation;
import org.springframework.data.mongodb.core.ReactiveMongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Query.query;

/**
 * Created on: 4/11/20
 *
 * @author Denis Citaku
 **/
@Service
public class LocationService extends BasicServiceOperation<Location, LocationPayload, LocationRepository> {

  protected LocationService(LocationRepository repository, ReactiveMongoOperations reactiveOps) {
    super(LocationMapper.INSTANCE, repository, reactiveOps);
  }

  public Mono<Long> getAndIncrementSequenceByIdAndMovementKind(String id, MovementKind kind) {
    return reactiveOps.findAndModify(
        query(Criteria.where("id").is(id)),
        new Update().inc("sequenceByMovementKind." + kind, 1),
        options().returnNew(true).upsert(true),
        Location.class)
        .map(x -> x.getSequenceByMovementKind().get(kind));
  }
}
