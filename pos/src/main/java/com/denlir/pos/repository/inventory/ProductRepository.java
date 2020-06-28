package com.denlir.pos.repository.inventory;

import com.denlir.pos.entity.inventory.Product;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.math.BigDecimal;

/**
 * Created on: 3/1/20
 *
 * @author Denis Citaku
 **/
public interface ProductRepository extends ReactiveMongoRepository<Product, String> {

  Flux<Product> findAllByCodeContainingIgnoreCaseOrNameContainingIgnoreCase(String code, String name);

  Flux<Product> findAllByNameLike(String name);

  Mono<Product> findByCode(String code);

  Flux<Product> findAllByStockStockIdLocationIdAndStockUnitsLessThan(String locationId, BigDecimal units);

}
