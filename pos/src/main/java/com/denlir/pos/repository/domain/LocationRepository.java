package com.denlir.pos.repository.domain;

import com.denlir.pos.entity.domain.Location;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;

/**
 * Created on: 3/1/20
 *
 * @author Denis Citaku
 **/
public interface LocationRepository extends ReactiveMongoRepository<Location, String> {

  Mono<Location> findByName(String name);

}
