package com.denlir.pos.entity.inventory;

import com.denlir.pos.entity.BaseAuditEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import java.math.BigDecimal;

/**
 * Created on: 3/1/20
 *
 * @author Denis Citaku
 **/
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Uom extends BaseAuditEntity {

  private String smallerUnitName;

  private String biggerUnitName;

  private BigDecimal convertValue;

}
