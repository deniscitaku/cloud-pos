package com.denlir.pos.entity.inventory;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import java.io.Serializable;

/**
 * Created on: 4/11/20
 *
 * @author Denis Citaku
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class StockId implements Serializable {

  private Long locationId;

  private Long productId;

}
