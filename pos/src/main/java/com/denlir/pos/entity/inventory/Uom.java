package com.denlir.pos.entity.inventory;

import com.denlir.pos.entity.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;

/**
 * Created on: 3/1/20
 *
 * @author Denis Citaku
 **/
@Data
@EqualsAndHashCode(callSuper = true)
@Document
public class Uom extends BaseEntity {

  private String smallerUnitName;

  private String biggerUnitName;

  private BigDecimal convertValue;

}
