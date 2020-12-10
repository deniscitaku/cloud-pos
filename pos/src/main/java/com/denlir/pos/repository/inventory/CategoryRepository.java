package com.denlir.pos.repository.inventory;

import com.denlir.pos.entity.inventory.Category;
import com.denlir.pos.entity.inventory.Uom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * Created on: 4/12/20
 *
 * @author Denis Citaku
 **/
public interface CategoryRepository extends JpaRepository<Category, Long> {

  @Query(
      countQuery = "SELECT DISTINCT COUNT(c) " +
          "FROM Category c " +
          "JOIN c.subCategories sc " +
          "WHERE LOWER(c.name) LIKE ?1 " +
          "OR (sc IS NOT NULL AND LOWER(sc.name) LIKE ?1)",
      value = "SELECT DISTINCT c " +
          "FROM Category c " +
          "JOIN c.subCategories sc " +
          "WHERE LOWER(c.name) LIKE ?1 " +
          "OR (sc IS NOT NULL AND LOWER(sc.name) LIKE ?1)"
  )
  Page<Category> findAllPageableWithSearch(String search, Pageable pageable);

}
