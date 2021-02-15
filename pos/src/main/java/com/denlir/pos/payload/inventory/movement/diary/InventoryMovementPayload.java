package com.denlir.pos.payload.inventory.movement.diary;

import com.denlir.pos.common.GenerateTS;
import com.denlir.pos.entity.inventory.movement.MovementKind;
import com.denlir.pos.entity.inventory.movement.sale.Status;
import com.denlir.pos.payload.BaseAuditPayload;
import com.denlir.pos.payload.domain.LocationPayload;
import com.denlir.pos.validation.groups.ReferenceId;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.groups.ConvertGroup;
import java.util.Collections;
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

  private Long sequence;

  @NotNull
  private MovementKind kind;

  private List<@Valid InventoryMovementLinePayload> inventoryMovementLines;

  @Valid
  @ConvertGroup(to = ReferenceId.class)
  @NotNull
  private LocationPayload location;

  @Valid
  @ConvertGroup(to = ReferenceId.class)
  private SupplierPayload supplier;

  private LocationPayload locationTo;

  private Status status;

  public List<InventoryMovementLinePayload> getInventoryMovementLines() {
    return inventoryMovementLines == null ? Collections.emptyList() : inventoryMovementLines;
  }
}
