package com.denlir.pos.payload.inventory;

import com.denlir.pos.entity.inventory.Stock;
import com.denlir.pos.payload.BaseMapper;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

/**
 * Created on: 4/10/20
 *
 * @author Denis Citaku
 **/
@Mapper
public interface StockMapper extends BaseMapper<Stock, StockPayload> {

  StockMapper INSTANCE = Mappers.getMapper(StockMapper.class);

}
