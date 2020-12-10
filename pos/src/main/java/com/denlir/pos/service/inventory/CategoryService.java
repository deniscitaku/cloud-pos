package com.denlir.pos.service.inventory;

import com.denlir.pos.entity.inventory.Category;
import com.denlir.pos.payload.domain.PagePayload;
import com.denlir.pos.payload.inventory.CategoryMapper;
import com.denlir.pos.payload.inventory.CategoryPayload;
import com.denlir.pos.payload.inventory.SubCategoryMapper;
import com.denlir.pos.payload.inventory.UomPayload;
import com.denlir.pos.repository.inventory.CategoryRepository;
import com.denlir.pos.service.BasicServiceOperation;
import com.denlir.pos.service.FieldInclude;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.HashSet;

import static com.denlir.pos.service.FieldInclude.ofEntityAndMapper;

/**
 * Created on: 4/12/20
 *
 * @author Denis Citaku
 **/
@Service
public class CategoryService extends BasicServiceOperation<Category, CategoryPayload, CategoryRepository> {

  private final SubCategoryMapper subCategoryMapper;

  protected CategoryService(CategoryMapper categoryMapper, SubCategoryMapper subCategoryMapper, CategoryRepository repository) {
    super(categoryMapper, repository);
    this.subCategoryMapper = subCategoryMapper;
  }

  @Override
  public PagePayload<CategoryPayload> findAllPagedWithSearch(String search, PageRequest pageRequest, String... includeFields) {
    Page<CategoryPayload> categories = repository.findAllPageableWithSearch(search, pageRequest)
        .map(x -> includeFields(ofEntityAndMapper(x, mapper, includeFields)));

    return PagePayload.fromPageable(categories);
  }

  @Override
  public CategoryPayload includeFields(FieldInclude<Category, CategoryPayload> fieldInclude) {
    return fieldInclude.ofField("subCategories")
        .withGetter(Category::getSubCategories)
        .map(subCategoryMapper::partialEntitiesToPayloads)
        .withSetter((x, y) -> x.setSubCategories(new HashSet<>(y)))
        .get();
  }
}
