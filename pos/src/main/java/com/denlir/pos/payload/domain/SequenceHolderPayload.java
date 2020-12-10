package com.denlir.pos.payload.domain;

import annotation.FluentBuilder;
import com.denlir.pos.common.GenerateTS;
import com.denlir.pos.entity.inventory.movement.MovementKind;
import com.denlir.pos.payload.BasePayload;
import lombok.Data;
import lombok.EqualsAndHashCode;

@FluentBuilder
@GenerateTS
@Data
@EqualsAndHashCode(callSuper = true)
public class SequenceHolderPayload extends BasePayload {

  private MovementKind movementKind;

  private Long sequence;

}
