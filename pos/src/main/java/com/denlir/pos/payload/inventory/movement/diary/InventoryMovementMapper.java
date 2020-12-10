package com.denlir.pos.payload.inventory.movement.diary;

import com.denlir.pos.entity.inventory.movement.diary.InventoryMovement;
import com.denlir.pos.payload.BaseMapper;
import com.denlir.pos.payload.PartialMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

/**
 * Created on: 4/13/20
 *
 * @author Denis Citaku
 **/
@Mapper(componentModel = "spring", uses = {InventoryMovementLineMapper.class})
public interface InventoryMovementMapper extends BaseMapper<InventoryMovement, InventoryMovementPayload> {

  @Override
  @PartialMapper
  @Mapping(target = "inventoryMovementLines", qualifiedBy = PartialMapper.class)
  InventoryMovementPayload partialEntityToPayload(InventoryMovement entity);

}
