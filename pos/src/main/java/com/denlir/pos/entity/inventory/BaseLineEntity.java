package com.denlir.pos.entity.inventory;

import com.denlir.pos.entity.BaseEntity;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.math.BigDecimal;

/**
 * Created on: 4/13/20
 *
 * @author Denis Citaku
 **/
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
public abstract class BaseLineEntity extends BaseEntity {

  private Integer lineNumber;

  @DBRef
  private Product product;

  private BigDecimal priceBuy;

  private BigDecimal quantity;

}
