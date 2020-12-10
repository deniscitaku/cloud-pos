package com.denlir.pos.repository.inventory.movement.diary;

import com.denlir.pos.entity.inventory.movement.diary.Supplier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import reactor.core.publisher.Mono;

/**
 * Created on: 4/13/20
 *
 * @author Denis Citaku
 **/
public interface SupplierRepository extends JpaRepository<Supplier, Long> {

  boolean existsByName(String name);

  boolean existsByNameAndIdIsNot(String name, Long id);

  @Query(
      countQuery = "SELECT COUNT(s) " +
          "FROM Supplier s " +
          "WHERE LOWER(s.name) LIKE ?1 " +
          "OR LOWER(s.email) LIKE ?1 " +
          "OR LOWER(s.nui) LIKE ?1 " +
          "OR LOWER(s.phoneNumber) LIKE ?1 ",
      value = "SELECT s " +
          "FROM Supplier s " +
          "WHERE LOWER(s.name) LIKE ?1 " +
          "OR LOWER(s.email) LIKE ?1 " +
          "OR LOWER(s.nui) LIKE ?1 " +
          "OR LOWER(s.phoneNumber) LIKE ?1 "
  )
  Page<Supplier> findAllPageableWithSearch(String search, PageRequest pageRequest);

}
