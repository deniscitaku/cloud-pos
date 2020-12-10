package com.denlir.pos.repository.inventory.movement.diary;

import com.denlir.pos.entity.inventory.movement.diary.InventoryMovementLine;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created on: 4/13/20
 *
 * @author Denis Citaku
 **/
public interface InventoryMovementLineRepository extends JpaRepository<InventoryMovementLine, Long> {
}
