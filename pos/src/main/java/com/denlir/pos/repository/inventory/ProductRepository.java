package com.denlir.pos.repository.inventory;

import com.denlir.pos.entity.inventory.Product;
import com.denlir.pos.entity.inventory.SubCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created on: 3/1/20
 *
 * @author Denis Citaku
 **/
public interface ProductRepository extends JpaRepository<Product, Long> {

  List<Product> findAllByCodeContainingIgnoreCaseOrNameContainingIgnoreCase(String code, String name);

  List<Product> findAllByNameLike(String name);

  Product findByCode(String code);

  boolean existsByCodeAndIdIsNot(String code, Long id);

  boolean existsByCode(String code);

  @Query(
      countQuery = "SELECT COUNT(p) " +
          "FROM Product p " +
          "LEFT JOIN p.category c " +
          "LEFT JOIN p.subCategory sc " +
          "LEFT JOIN p.tax t " +
          "WHERE LOWER(p.code) LIKE ?1 " +
          "OR LOWER(p.name) LIKE ?1 " +
          "OR LOWER(p.displayName) LIKE ?1 " +
          "OR (c IS NOT NULL AND LOWER(c.name) LIKE ?1) " +
          "OR (sc IS NOT NULL AND LOWER(sc.name) LIKE ?1) " +
          "OR (t IS NOT NULL AND LOWER(t.name) LIKE ?1) " +
          "OR CAST(p.priceBuy AS text) LIKE ?1 " +
          "OR CAST(p.priceSell AS text) LIKE ?1 " +
          "OR CAST(p.priceTax AS text) LIKE ?1 " +
          "OR CAST(p.minStock AS text) LIKE ?1 "
          ,
      value = "SELECT p " +
          "FROM Product p " +
          "LEFT JOIN p.category c " +
          "LEFT JOIN p.subCategory sc " +
          "LEFT JOIN p.tax t " +
          "WHERE LOWER(p.code) LIKE ?1 " +
          "OR LOWER(p.name) LIKE ?1 " +
          "OR LOWER(p.displayName) LIKE ?1 " +
          "OR (c IS NOT NULL AND LOWER(c.name) LIKE ?1) " +
          "OR (sc IS NOT NULL AND LOWER(sc.name) LIKE ?1) " +
          "OR (t IS NOT NULL AND LOWER(t.name) LIKE ?1) " +
          "OR CAST(p.priceBuy AS text) LIKE ?1 " +
          "OR CAST(p.priceSell AS text) LIKE ?1 " +
          "OR CAST(p.priceTax AS text) LIKE ?1 " +
          "OR CAST(p.minStock AS text) LIKE ?1 "
  )
  Page<Product> findAllPageableWithSearch(String search, Pageable pageable);

  @Query(
      value = "SELECT p " +
          "FROM Product p " +
          "WHERE p.category.id LIKE ?1"
  )
  List<Product> findAllByCategoryId(Long id);

  @Query(
      value = "SELECT p " +
          "FROM Product p " +
          "WHERE p.subCategory.id LIKE ?1"
  )
  List<Product> findAllBySubCategoryId(Long id);

}
