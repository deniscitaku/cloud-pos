package com.denlir.pos.repository.inventory.movement.diary;

import com.denlir.pos.entity.inventory.movement.diary.Supplier;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;

/**
 * Created on: 4/13/20
 *
 * @author Denis Citaku
 **/
public interface SupplierRepository extends ReactiveMongoRepository<Supplier, String> {

  Flux<Supplier> findByNameLike(String name);

}
