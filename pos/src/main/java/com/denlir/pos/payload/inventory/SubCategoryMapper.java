package com.denlir.pos.payload.inventory;

import com.denlir.pos.entity.inventory.SubCategory;
import com.denlir.pos.payload.BaseMapper;
import com.denlir.pos.payload.PartialMapper;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.Collection;
import java.util.Set;

@Mapper(componentModel = "spring")
public interface SubCategoryMapper extends BaseMapper<SubCategory, SubCategoryPayload> {

  @Override
  @PartialMapper
  @Mapping(target = "category", ignore = true)
  SubCategoryPayload partialEntityToPayload(SubCategory entity);

}
