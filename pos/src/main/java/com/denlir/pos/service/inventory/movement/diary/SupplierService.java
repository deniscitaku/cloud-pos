package com.denlir.pos.service.inventory.movement.diary;

import com.denlir.pos.entity.inventory.movement.diary.Supplier;
import com.denlir.pos.payload.inventory.movement.diary.SupplierMapper;
import com.denlir.pos.payload.inventory.movement.diary.SupplierPayload;
import com.denlir.pos.repository.inventory.movement.diary.SupplierRepository;
import com.denlir.pos.service.BasicServiceOperation;
import org.springframework.data.mongodb.core.ReactiveMongoOperations;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

/**
 * Created on: 4/13/20
 *
 * @author Denis Citaku
 **/
@Service
public class SupplierService extends BasicServiceOperation<Supplier, SupplierPayload, SupplierRepository> {

  protected SupplierService(SupplierRepository repository, ReactiveMongoOperations reactiveOps) {
    super(SupplierMapper.INSTANCE, repository, reactiveOps);
  }

  public Flux<SupplierPayload> findByNameLike(String name) {
    return repository.findByNameLike(name)
        .map(mapper::entityToPayload);
  }

}
