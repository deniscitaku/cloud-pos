package com.denlir.pos.repository.inventory;

import com.denlir.pos.entity.inventory.Uom;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

/**
 * Created on: 3/1/20
 *
 * @author Denis Citaku
 **/
public interface UomRepository extends ReactiveMongoRepository<Uom, String> {
}
