package com.denlir.pos.repository.inventory;

import com.denlir.pos.entity.inventory.Category;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

/**
 * Created on: 4/12/20
 *
 * @author Denis Citaku
 **/
public interface CategoryRepository extends ReactiveMongoRepository<Category, String> {
}
