package com.denlir.pos.payload.domain;

import com.denlir.pos.entity.domain.User;
import com.denlir.pos.payload.BaseMapper;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper extends BaseMapper<User, UserPayload> {
}
