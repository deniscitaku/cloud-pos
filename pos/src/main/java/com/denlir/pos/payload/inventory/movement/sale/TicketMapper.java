package com.denlir.pos.payload.inventory.movement.sale;

import com.denlir.pos.entity.inventory.movement.sale.Ticket;
import com.denlir.pos.payload.BaseMapper;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

/**
 * Created on: 4/10/20
 *
 * @author Denis Citaku
 **/
@Mapper(componentModel = "spring")
public interface TicketMapper extends BaseMapper<Ticket, TicketPayload> {
}
