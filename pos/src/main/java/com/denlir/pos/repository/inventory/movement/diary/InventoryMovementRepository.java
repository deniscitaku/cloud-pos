package com.denlir.pos.repository.inventory.movement.diary;

import com.denlir.pos.entity.inventory.movement.MovementKind;
import com.denlir.pos.entity.inventory.movement.diary.InventoryMovement;
import com.denlir.pos.entity.inventory.movement.sale.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created on: 4/13/20
 *
 * @author Denis Citaku
 **/
public interface InventoryMovementRepository extends JpaRepository<InventoryMovement, Long> {

  List<InventoryMovement> findByKind(MovementKind kind);

  List<InventoryMovement> findByKindAndStatusOrderByUpdatedOn(MovementKind kind, Status status);

}
