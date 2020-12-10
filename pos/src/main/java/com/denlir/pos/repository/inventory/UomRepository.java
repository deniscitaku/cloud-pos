package com.denlir.pos.repository.inventory;

import com.denlir.pos.entity.inventory.Uom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created on: 3/1/20
 *
 * @author Denis Citaku
 **/
public interface UomRepository extends JpaRepository<Uom, Long> {

  @Query(
      countQuery = "SELECT COUNT(u) " +
      "FROM Uom u " +
      "WHERE LOWER(u.smallerUnitName) LIKE ?1 " +
      "OR LOWER(u.biggerUnitName) LIKE ?1 " +
      "OR CAST(u.convertValue AS text) LIKE ?1",

      value = "SELECT u " +
          "FROM Uom u " +
          "WHERE LOWER(u.smallerUnitName) LIKE ?1 " +
          "OR LOWER(u.biggerUnitName) LIKE ?1 " +
          "OR CAST(u.convertValue AS text) LIKE ?1"
  )
  Page<Uom> findAllPageableWithSearch(String search, Pageable pageable);

}
