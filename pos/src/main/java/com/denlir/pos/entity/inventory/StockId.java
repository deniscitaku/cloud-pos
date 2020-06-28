package com.denlir.pos.entity.inventory;

import lombok.Data;

import java.io.Serializable;

/**
 * Created on: 4/11/20
 *
 * @author Denis Citaku
 **/
@Data
public class StockId implements Serializable {

  private String productId;

  private String locationId;

}
