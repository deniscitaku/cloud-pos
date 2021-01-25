package com.denlir.pos.payload.inventory;

import com.denlir.pos.entity.inventory.Product;
import com.denlir.pos.payload.BaseMapper;
import com.denlir.pos.payload.IgnoreUserFields;
import com.denlir.pos.payload.PartialMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Created on: 4/10/20
 *
 * @author Denis Citaku
 **/

@Mapper(componentModel = "spring", uses = {SubCategoryMapper.class, CategoryMapper.class})
public interface ProductMapper extends BaseMapper<Product, ProductPayload> {

  @Override
  @PartialMapper
  @IgnoreUserFields
  @Mapping(target = "uoms", ignore = true)
  @Mapping(target = "subCategory.category", qualifiedBy = PartialMapper.class)
  @Mapping(target = "category.subCategories", qualifiedBy = PartialMapper.class)
  ProductPayload partialEntityToPayload(Product entity);

}
