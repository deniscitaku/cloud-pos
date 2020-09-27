package com.denlir.pos.service.inventory.movement.diary;

import com.denlir.pos.entity.inventory.movement.diary.Supplier;
import com.denlir.pos.exception.ValidationExceptionPayload;
import com.denlir.pos.payload.inventory.movement.diary.SupplierMapper;
import com.denlir.pos.payload.inventory.movement.diary.SupplierPayload;
import com.denlir.pos.repository.inventory.movement.diary.SupplierRepository;
import com.denlir.pos.service.BasicServiceOperation;
import org.springframework.data.mongodb.core.ReactiveMongoOperations;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

/**
 * Created on: 4/13/20
 *
 * @author Denis Citaku
 **/
@Service
public class SupplierService extends BasicServiceOperation<Supplier, SupplierPayload, SupplierRepository> {

  protected SupplierService(SupplierMapper supplierMapper, SupplierRepository repository, ReactiveMongoOperations reactiveOps) {
    super(supplierMapper, repository, reactiveOps);
  }

  @Override
  protected Mono<SupplierPayload> doDatabaseValidationOn(SupplierPayload payload, CrudOperation crudOperation) {
    if (crudOperation == CrudOperation.CREATE) {
      return repository.existsByName(payload.getName())
          .handle((exists, sink) -> {
            if (exists) {
              sink.error(ValidationExceptionPayload.builder()
                  .fieldName("name")
                  .message("must not be duplicate")
                  .rejectedValue(payload.getName())
                  .code("code.duplicate")
                  .build()
                  .toEntityValidationException());
            } else {
              sink.next(payload);
            }
          });
    }
    return Mono.just(payload);
  }
}
