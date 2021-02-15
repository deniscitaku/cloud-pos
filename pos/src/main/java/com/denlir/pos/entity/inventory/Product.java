
package com.denlir.pos.entity.inventory;

import com.denlir.pos.entity.BaseAuditEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import java.math.BigDecimal;
import java.util.Set;

/**
 * Created on: 3/1/20
 *
 * @author Denis Citaku
 **/
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Product extends BaseAuditEntity {

  @Column(unique = true)
  private String code;

  private String name;

  private String displayName;

  private BigDecimal priceBuy;

  private BigDecimal priceSell;

  private BigDecimal priceTax;

  @ManyToOne
  @JoinColumn
  private Category category;

  @ManyToOne
  @JoinColumn
  private SubCategory subCategory;

  @ManyToOne
  @JoinColumn
  private Tax tax;

  private BigDecimal minStock;

  @ManyToMany
  private Set<Uom> uoms;

}
