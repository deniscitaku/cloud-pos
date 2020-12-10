package com.denlir.pos.payload.domain;

import com.denlir.pos.entity.domain.Location;
import com.denlir.pos.payload.BaseMapper;
import org.mapstruct.Mapper;

/**
 * Created on: 4/11/20
 *
 * @author Denis Citaku
 **/
@Mapper(componentModel = "spring")
public interface LocationMapper extends BaseMapper<Location, LocationPayload> {
}
