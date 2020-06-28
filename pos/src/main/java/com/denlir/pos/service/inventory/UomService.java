package com.denlir.pos.service.inventory;

import com.denlir.pos.entity.inventory.Uom;
import com.denlir.pos.payload.inventory.UomMapper;
import com.denlir.pos.payload.inventory.UomPayload;
import com.denlir.pos.repository.inventory.UomRepository;
import com.denlir.pos.service.BasicServiceOperation;
import org.springframework.data.mongodb.core.ReactiveMongoOperations;
import org.springframework.stereotype.Service;

/**
 * Created on: 4/12/20
 *
 * @author Denis Citaku
 **/
@Service
public class UomService extends BasicServiceOperation<Uom, UomPayload, UomRepository> {

  protected UomService(UomRepository repository, ReactiveMongoOperations reactiveOps) {
    super(UomMapper.INSTANCE, repository, reactiveOps);
  }

}
