package com.denlir.pos.payload.domain;

import com.denlir.pos.entity.domain.SequenceHolder;
import com.denlir.pos.payload.BaseMapper;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SequenceHolderMapper extends BaseMapper<SequenceHolder, SequenceHolderPayload> {
}
