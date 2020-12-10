package com.denlir.pos.entity.inventory;

import lombok.Data;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import java.math.BigDecimal;

/**
 * Created on: 3/1/20
 *
 * @author Denis Citaku
 **/
@Data
@Entity
public class Stock {

  @EmbeddedId
  private StockId stockId;

  private BigDecimal units;

}
