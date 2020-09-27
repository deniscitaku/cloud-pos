package com.denlir.pos.payload.inventory;

import com.denlir.pos.entity.inventory.Product;
import com.denlir.pos.payload.BaseMapper;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

/**
 * Created on: 4/10/20
 *
 * @author Denis Citaku
 **/
@Mapper(componentModel = "spring")
public interface ProductMapper extends BaseMapper<Product, ProductPayload> { }
