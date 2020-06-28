package com.denlir.pos.payload.domain;

import com.denlir.pos.entity.domain.Location;
import com.denlir.pos.payload.BaseMapper;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

/**
 * Created on: 4/11/20
 *
 * @author Denis Citaku
 **/
@Mapper
public interface LocationMapper extends BaseMapper<Location, LocationPayload> {

  LocationMapper INSTANCE = Mappers.getMapper(LocationMapper.class);

}
