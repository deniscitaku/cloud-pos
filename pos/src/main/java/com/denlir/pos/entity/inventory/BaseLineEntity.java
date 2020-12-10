package com.denlir.pos.entity.inventory;

import com.denlir.pos.entity.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * Created on: 4/13/20
 *
 * @author Denis Citaku
 **/
@Data
@EqualsAndHashCode(callSuper = true)
@MappedSuperclass
public abstract class BaseLineEntity extends BaseEntity {

  private Integer lineNumber;

  @OneToOne
  @JoinColumn
  private Product product;

  private BigDecimal priceBuy;

  private BigDecimal priceSell;

  private BigDecimal quantity;

  private BigDecimal amount;

  @OneToOne
  @JoinColumn
  private Tax tax;

  @OneToOne
  @JoinColumn
  private Uom uom;

}
