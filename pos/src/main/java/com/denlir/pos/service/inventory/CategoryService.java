package com.denlir.pos.service.inventory;

import com.denlir.pos.entity.inventory.Category;
import com.denlir.pos.payload.inventory.CategoryMapper;
import com.denlir.pos.payload.inventory.CategoryPayload;
import com.denlir.pos.repository.inventory.CategoryRepository;
import com.denlir.pos.service.BasicServiceOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.ReactiveMongoOperations;
import org.springframework.stereotype.Service;

/**
 * Created on: 4/12/20
 *
 * @author Denis Citaku
 **/
@Service
public class CategoryService extends BasicServiceOperation<Category, CategoryPayload, CategoryRepository> {

  protected CategoryService(CategoryMapper categoryMapper, CategoryRepository repository, ReactiveMongoOperations reactiveOps) {
    super(categoryMapper, repository, reactiveOps);
  }

}
