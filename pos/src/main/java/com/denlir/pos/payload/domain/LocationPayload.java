package com.denlir.pos.payload.domain;

import com.denlir.pos.common.GenerateTS;
import com.denlir.pos.entity.inventory.movement.MovementKind;
import com.denlir.pos.payload.BasePayload;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Map;

/**
 * Created on: 3/4/20
 *
 * @author Denis Citaku
 **/
@Data
@EqualsAndHashCode(callSuper = true)
@GenerateTS
public class LocationPayload extends BasePayload {

  private String name;

  private Map<MovementKind, Long> sequenceByMovementKind;

}
