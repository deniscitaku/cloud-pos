package com.denlir.pos.repository.domain;

import com.denlir.pos.entity.domain.SequenceHolder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SequenceHolderRepository extends JpaRepository<SequenceHolder, Long> {

  @Query(value = "UPDATE sequence_holder " +
      "SET sequence = sequence + 1 " +
      "WHERE location_id = ?1 " +
      "AND movement_kind = ?2 RETURNING sequence",
      nativeQuery = true)
  Long getAndIncrementSequenceByIdAndMovementKind(Long locationId, String movementKind);

}
