package com.denlir.pos.repository.inventory;

import com.denlir.pos.entity.inventory.Tax;
import com.denlir.pos.service.FieldInclude;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import reactor.core.publisher.Mono;

import java.math.BigDecimal;

/**
 * Created on: 3/1/20
 *
 * @author Denis Citaku
 **/
public interface TaxRepository extends JpaRepository<Tax, Long> {

  boolean existsByIsDefaultIsTrue();

  boolean existsByIsDefaultIsTrueAndIdIsNot(Long id);

  Tax findByNameLike(String name);

  Tax findByTaxRate(BigDecimal taxRate);

  @Query(
      countQuery = "SELECT COUNT(t) " +
          "FROM Tax t " +
          "WHERE LOWER(t.name) LIKE ?1 " +
          "OR CAST(t.taxRate AS text) LIKE ?1",

      value = "SELECT t " +
          "FROM Tax t " +
          "WHERE LOWER(t.name) LIKE ?1 " +
          "OR CAST(t.taxRate AS text) LIKE ?1"
  )
  Page<Tax> findAllPageableWithSearch(String search, PageRequest pageRequest);

}
