package com.denlir.pos.payload.inventory.movement.diary;

import com.denlir.pos.entity.inventory.movement.diary.InventoryMovementLine;
import com.denlir.pos.payload.BaseMapper;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

/**
 * Created on: 4/13/20
 *
 * @author Denis Citaku
 **/
@Mapper(componentModel = "spring")
public interface InventoryMovementLineMapper extends BaseMapper<InventoryMovementLine, InventoryMovementLinePayload> {
}
