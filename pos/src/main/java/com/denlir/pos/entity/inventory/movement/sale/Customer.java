package com.denlir.pos.entity.inventory.movement.sale;

import com.denlir.pos.entity.BaseAuditEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import java.math.BigDecimal;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Customer extends BaseAuditEntity {
  
  private String name;

  private String email;

  private String phoneNumber;

  private BigDecimal currentDebt;

  private BigDecimal maxDebt;

  private Integer discount;

}
