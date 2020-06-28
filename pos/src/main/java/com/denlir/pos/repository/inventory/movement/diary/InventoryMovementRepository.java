package com.denlir.pos.repository.inventory.movement.diary;

import com.denlir.pos.entity.inventory.movement.MovementKind;
import com.denlir.pos.entity.inventory.movement.diary.InventoryMovement;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;

/**
 * Created on: 4/13/20
 *
 * @author Denis Citaku
 **/
public interface InventoryMovementRepository extends ReactiveMongoRepository<InventoryMovement, String> {

  Flux<InventoryMovement> findByKind(MovementKind kind);

}
