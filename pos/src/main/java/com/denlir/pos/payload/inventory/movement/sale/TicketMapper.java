package com.denlir.pos.payload.inventory.movement.sale;

import com.denlir.pos.entity.inventory.movement.sale.Ticket;
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
@Mapper(componentModel = "spring", uses = TicketLineMapper.class)
public interface TicketMapper extends BaseMapper<Ticket, TicketPayload> {

  @Override
  @PartialMapper
  @IgnoreUserFields
  @Mapping(target = "ticketLines", qualifiedBy = PartialMapper.class)
  TicketPayload partialEntityToPayload(Ticket entity);

}
