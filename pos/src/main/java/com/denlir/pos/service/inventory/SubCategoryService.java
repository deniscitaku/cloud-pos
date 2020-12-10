package com.denlir.pos.service.inventory;

import com.denlir.pos.entity.inventory.SubCategory;
import com.denlir.pos.payload.domain.PagePayload;
import com.denlir.pos.payload.inventory.CategoryMapper;
import com.denlir.pos.payload.inventory.SubCategoryMapper;
import com.denlir.pos.payload.inventory.SubCategoryPayload;
import com.denlir.pos.repository.inventory.SubCategoryRepository;
import com.denlir.pos.service.BasicServiceOperation;
import com.denlir.pos.service.FieldInclude;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import static com.denlir.pos.service.FieldInclude.ofEntityAndMapper;

@Service
public class SubCategoryService extends BasicServiceOperation<SubCategory, SubCategoryPayload, SubCategoryRepository> {

  private final CategoryMapper categoryMapper;

  protected SubCategoryService(SubCategoryMapper mapper, SubCategoryRepository repository, CategoryMapper categoryMapper) {
    super(mapper, repository);
    this.categoryMapper = categoryMapper;
  }

  @Override
  public PagePayload<SubCategoryPayload> findAllPagedWithSearch(String search, PageRequest pageRequest, String... includeFields) {
    return PagePayload.fromPageable(repository.findAllPageableWithSearch(search, pageRequest)
        .map(x -> includeFields(ofEntityAndMapper(x, mapper, includeFields))));
  }

  @Override
  public SubCategoryPayload includeFields(FieldInclude<SubCategory, SubCategoryPayload> fieldInclude) {
    return fieldInclude.ofField("category")
        .withGetter(SubCategory::getCategory)
        .map(categoryMapper::partialEntityToPayload)
        .withSetter(SubCategoryPayload::setCategory)
        .get();
  }
}
