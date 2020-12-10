package com.denlir.pos.payload.inventory.movement.diary;

import com.denlir.pos.entity.inventory.movement.diary.InventoryMovementLine;
import com.denlir.pos.payload.BaseMapper;
import com.denlir.pos.payload.PartialMapper;
import com.denlir.pos.payload.inventory.ProductMapper;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Collection;
import java.util.Set;

/**
 * Created on: 4/13/20
 *
 * @author Denis Citaku
 **/
@Mapper(componentModel = "spring", uses = ProductMapper.class)
public interface InventoryMovementLineMapper extends BaseMapper<InventoryMovementLine, InventoryMovementLinePayload> {

  @Override
  @PartialMapper
  @Mapping(target = "product", qualifiedBy = PartialMapper.class)
  InventoryMovementLinePayload partialEntityToPayload(InventoryMovementLine entity);

}
