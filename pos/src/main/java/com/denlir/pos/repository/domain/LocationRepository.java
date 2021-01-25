package com.denlir.pos.repository.domain;

import com.denlir.pos.entity.domain.Location;
import com.denlir.pos.entity.inventory.movement.MovementKind;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

/**
 * Created on: 3/1/20
 *
 * @author Denis Citaku
 **/
public interface LocationRepository extends JpaRepository<Location, Long> {

  boolean existsByName(String name);

  boolean existsByNameAndIdIsNot(String name, Long id);

}
