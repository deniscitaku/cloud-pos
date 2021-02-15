package com.denlir.pos.repository.inventory.movement.diary;

import com.denlir.pos.entity.inventory.movement.MovementKind;
import com.denlir.pos.entity.inventory.movement.diary.InventoryMovement;
import com.denlir.pos.entity.inventory.movement.sale.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Created on: 4/13/20
 *
 * @author Denis Citaku
 **/
public interface InventoryMovementRepository extends JpaRepository<InventoryMovement, Long> {

  List<InventoryMovement> findByKind(MovementKind kind);

  Optional<InventoryMovement> findFirstByKindAndStatus(MovementKind kind, Status status);

  @Query(
      countQuery = "SELECT COUNT(im) FROM InventoryMovement im " +
          "WHERE im.kind = ?1 " +
          "AND im.status = ?2 " +
          "AND (im.createdOn BETWEEN ?3 AND ?4) " +
          "AND (?5 = 0L OR im.supplier.id = ?5)",
      value = "SELECT im FROM InventoryMovement im " +
          "WHERE im.kind = ?1 " +
          "AND im.status = ?2 " +
          "AND (im.createdOn BETWEEN ?3 AND ?4) " +
          "AND (?5 = 0L OR im.supplier.id = ?5)")
  Page<InventoryMovement> findAllByKindAndStatusAndDateBetweenAndSupplierId(MovementKind kind,
                                                                            Status status,
                                                                            LocalDateTime from,
                                                                            LocalDateTime to,
                                                                            Long supplierId,
                                                                            Pageable pageable);

}
