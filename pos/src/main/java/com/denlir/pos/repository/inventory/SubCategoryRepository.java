package com.denlir.pos.repository.inventory;

import com.denlir.pos.entity.inventory.SubCategory;
import com.denlir.pos.entity.inventory.Uom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SubCategoryRepository extends JpaRepository<SubCategory, Long> {

  @Query(
      countQuery = "SELECT COUNT(sc) " +
          "FROM SubCategory sc " +
          "WHERE LOWER(sc.name) LIKE ?1 " +
          "OR (sc.category IS NOT NULL AND LOWER(sc.category.name) LIKE ?1)",
      value = "SELECT sc " +
          "FROM SubCategory sc " +
          "WHERE LOWER(sc.name) LIKE ?1 " +
          "OR (sc.category IS NOT NULL AND LOWER(sc.category.name) LIKE ?1)"
  )
  Page<SubCategory> findAllPageableWithSearch(String search, Pageable pageable);

}
