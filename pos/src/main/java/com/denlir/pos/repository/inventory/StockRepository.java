package com.denlir.pos.repository.inventory;

import com.denlir.pos.entity.inventory.Stock;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

/**
 * Created on: 3/15/20
 *
 * @author Denis Citaku
 **/
public interface StockRepository extends ReactiveMongoRepository<Stock, String> {
}
