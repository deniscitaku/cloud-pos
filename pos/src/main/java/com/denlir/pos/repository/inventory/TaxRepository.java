package com.denlir.pos.repository.inventory;

import com.denlir.pos.entity.inventory.Tax;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;

import java.math.BigDecimal;

/**
 * Created on: 3/1/20
 *
 * @author Denis Citaku
 **/
public interface TaxRepository extends ReactiveMongoRepository<Tax, String> {

  Mono<Tax> findByNameLike(String name);

  Mono<Tax> findByTaxRate(BigDecimal taxRate);

}
