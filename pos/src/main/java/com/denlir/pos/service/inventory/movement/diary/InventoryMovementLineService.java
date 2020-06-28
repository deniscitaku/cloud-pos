package com.denlir.pos.service.inventory.movement.diary;

import com.denlir.pos.entity.inventory.movement.diary.InventoryMovementLine;
import com.denlir.pos.payload.inventory.movement.diary.InventoryMovementLineMapper;
import com.denlir.pos.payload.inventory.movement.diary.InventoryMovementLinePayload;
import com.denlir.pos.repository.inventory.movement.diary.InventoryMovementLineRepository;
import com.denlir.pos.service.BasicServiceOperation;
import org.springframework.data.mongodb.core.ReactiveMongoOperations;
import org.springframework.stereotype.Service;

/**
 * Created on: 4/13/20
 *
 * @author Denis Citaku
 **/
@Service
public class InventoryMovementLineService extends
    BasicServiceOperation<InventoryMovementLine, InventoryMovementLinePayload, InventoryMovementLineRepository> {

  protected InventoryMovementLineService(InventoryMovementLineRepository repository, ReactiveMongoOperations reactiveOps) {
    super(InventoryMovementLineMapper.INSTANCE, repository, reactiveOps);
  }

}
