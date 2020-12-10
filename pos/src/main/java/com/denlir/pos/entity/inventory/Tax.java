package com.denlir.pos.entity.inventory;

import com.denlir.pos.entity.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToOne;
import java.math.BigDecimal;

/**
 * Created on: 3/1/20
 *
 * @author Denis Citaku
 **/
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
public class Tax extends BaseEntity {

  private String name;

  private BigDecimal taxRate;

  @Column(nullable = false)
  private boolean isDefault;

}
