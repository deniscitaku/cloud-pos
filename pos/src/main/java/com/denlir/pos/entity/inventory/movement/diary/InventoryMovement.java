package com.denlir.pos.entity.inventory.movement.diary;

import com.denlir.pos.entity.BaseAuditEntity;
import com.denlir.pos.entity.domain.Location;
import com.denlir.pos.entity.inventory.movement.MovementKind;
import com.denlir.pos.entity.inventory.movement.sale.Status;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.List;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.EnumType.STRING;
import static javax.persistence.FetchType.EAGER;

/**
 * Created on: 4/13/20
 *
 * @author Denis Citaku
 **/
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class InventoryMovement extends BaseAuditEntity {

  @Column(columnDefinition="serial")
  private Long sequence;

  @Enumerated(STRING)
  private MovementKind kind;

  @OneToMany(orphanRemoval = true, cascade = ALL, fetch = EAGER)
  @JoinColumn
  private List<InventoryMovementLine> inventoryMovementLines;

  @OneToOne
  @JoinColumn
  private Location location;

  @OneToOne
  @JoinColumn
  private Supplier supplier;

  @OneToOne
  @JoinColumn
  private Location locationTo;

  @Enumerated(STRING)
  private Status status;

}
