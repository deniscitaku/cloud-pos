package com.denlir.pos.payload.inventory;

import com.denlir.pos.entity.inventory.Category;
import com.denlir.pos.payload.BaseMapper;
import com.denlir.pos.payload.PartialMapper;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Collection;
import java.util.Set;

/**
 * Created on: 4/12/20
 *
 * @author Denis Citaku
 **/
@Mapper(componentModel = "spring")
public interface CategoryMapper extends BaseMapper<Category, CategoryPayload> {

  @Override
  @PartialMapper
  @Mapping(target = "subCategories", ignore = true)
  CategoryPayload partialEntityToPayload(Category entity);

}
