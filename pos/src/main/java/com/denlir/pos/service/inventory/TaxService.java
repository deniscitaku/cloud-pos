package com.denlir.pos.service.inventory;

import com.denlir.pos.entity.inventory.Tax;
import com.denlir.pos.payload.inventory.TaxMapper;
import com.denlir.pos.payload.inventory.TaxPayload;
import com.denlir.pos.repository.inventory.TaxRepository;
import com.denlir.pos.service.BasicServiceOperation;
import org.springframework.data.mongodb.core.ReactiveMongoOperations;
import org.springframework.stereotype.Service;

/**
 * Created on: 4/12/20
 *
 * @author Denis Citaku
 **/
@Service
public class TaxService extends BasicServiceOperation<Tax, TaxPayload, TaxRepository> {

  protected TaxService(TaxRepository repository, ReactiveMongoOperations reactiveOps) {
    super(TaxMapper.INSTANCE, repository, reactiveOps);
  }

}
