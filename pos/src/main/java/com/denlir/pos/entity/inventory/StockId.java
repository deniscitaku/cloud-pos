package com.denlir.pos.entity.inventory;

import lombok.Data;

import javax.persistence.Embeddable;
import java.io.Serializable;

/**
 * Created on: 4/11/20
 *
 * @author Denis Citaku
 **/
@Data
@Embeddable
public class StockId implements Serializable {

  private Long productId;

  private Long locationId;

}
