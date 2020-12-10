package com.denlir.pos.payload.inventory.movement.sale;

import com.denlir.pos.entity.inventory.movement.sale.TicketLine;
import com.denlir.pos.payload.BaseMapper;
import com.denlir.pos.payload.PartialMapper;
import com.denlir.pos.payload.inventory.ProductMapper;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Collection;
import java.util.Set;

/**
 * Created on: 4/10/20
 *
 * @author Denis Citaku
 **/
@Mapper(componentModel = "spring", uses = ProductMapper.class)
public interface TicketLineMapper extends BaseMapper<TicketLine, TicketLinePayload> {

  @Override
  @PartialMapper
  @Mapping(target = "product", qualifiedBy = PartialMapper.class)
  TicketLinePayload partialEntityToPayload(TicketLine entity);

}
