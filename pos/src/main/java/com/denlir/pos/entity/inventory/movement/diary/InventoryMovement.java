package com.denlir.pos.entity.inventory.movement.diary;

import com.denlir.pos.entity.BaseAuditEntity;
import com.denlir.pos.entity.domain.Location;
import com.denlir.pos.entity.inventory.movement.MovementKind;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

/**
 * Created on: 4/13/20
 *
 * @author Denis Citaku
 **/
@Data
@EqualsAndHashCode(callSuper = true)
@Document("inventoryMovements")
public class InventoryMovement extends BaseAuditEntity {

  @Indexed
  private String sequence;

  private MovementKind kind;

  @DBRef
  private List<InventoryMovementLine> inventoryMovementLines;

  @DBRef
  private Location location;

  @DBRef
  private Supplier supplier;

  @DBRef
  private Location locationTo;

}
