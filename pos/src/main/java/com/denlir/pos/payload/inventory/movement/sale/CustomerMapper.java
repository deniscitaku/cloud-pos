package com.denlir.pos.payload.inventory.movement.sale;

import com.denlir.pos.entity.inventory.movement.sale.Customer;
import com.denlir.pos.payload.BaseMapper;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CustomerMapper extends BaseMapper<Customer, CustomerPayload> {
}
