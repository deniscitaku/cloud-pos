package com.denlir.pos.payload.inventory;

import com.denlir.pos.entity.inventory.Category;
import com.denlir.pos.payload.BaseMapper;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

/**
 * Created on: 4/12/20
 *
 * @author Denis Citaku
 **/
@Mapper
public interface CategoryMapper extends BaseMapper<Category, CategoryPayload> {

  CategoryMapper INSTANCE = Mappers.getMapper(CategoryMapper.class);

}
