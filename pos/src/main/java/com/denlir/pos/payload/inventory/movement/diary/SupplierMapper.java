package com.denlir.pos.payload.inventory.movement.diary;

import com.denlir.pos.entity.inventory.movement.diary.Supplier;
import com.denlir.pos.payload.BaseMapper;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

/**
 * Created on: 4/13/20
 *
 * @author Denis Citaku
 **/
@Mapper
public interface SupplierMapper extends BaseMapper<Supplier, SupplierPayload> {

  SupplierMapper INSTANCE = Mappers.getMapper(SupplierMapper.class);

}
