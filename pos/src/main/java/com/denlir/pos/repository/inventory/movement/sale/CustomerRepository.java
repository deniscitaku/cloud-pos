package com.denlir.pos.repository.inventory.movement.sale;

import com.denlir.pos.entity.inventory.movement.sale.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

  boolean existsByName(String name);

  boolean existsByNameAndIdIsNot(String name, Long id);

  @Query(
      countQuery = "SELECT COUNT(c) " +
          "FROM Customer c " +
          "WHERE LOWER(c.name) LIKE ?1 " +
          "OR LOWER(c.email) LIKE ?1 " +
          "OR LOWER(c.phoneNumber) LIKE ?1 " +
          "OR CAST(c.discount AS text) LIKE ?1 " +
          "OR CAST(c.maxDebt AS text) LIKE ?1 " +
          "OR CAST(c.currentDebt AS text) LIKE ?1 ",
      value = "SELECT c " +
          "FROM Customer c " +
          "WHERE LOWER(c.name) LIKE ?1 " +
          "OR LOWER(c.email) LIKE ?1 " +
          "OR LOWER(c.phoneNumber) LIKE ?1 " +
          "OR CAST(c.discount AS text) LIKE ?1 " +
          "OR CAST(c.maxDebt AS text) LIKE ?1 " +
          "OR CAST(c.currentDebt AS text) LIKE ?1 "
  )
  Page<Customer> findAllPageableWithSearch(String search, Pageable pageable);

}
