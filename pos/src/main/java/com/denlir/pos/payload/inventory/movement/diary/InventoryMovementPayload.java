package com.denlir.pos.payload.inventory.movement.diary;

import com.denlir.pos.common.GenerateTS;
import com.denlir.pos.entity.inventory.movement.MovementKind;
import com.denlir.pos.payload.BaseAuditPayload;
import com.denlir.pos.payload.domain.LocationPayload;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * Created on: 4/13/20
 *
 * @author Denis Citaku
 **/
@Data
@EqualsAndHashCode(callSuper = true)
@GenerateTS
public class InventoryMovementPayload extends BaseAuditPayload {

  private String sequence;

  @NotEmpty
  private MovementKind kind;

  private List<InventoryMovementLinePayload> inventoryMovementLines;

  @Valid
  private LocationPayload location;

  @NotNull
  private SupplierPayload supplier;

  private LocationPayload locationTo;

}
