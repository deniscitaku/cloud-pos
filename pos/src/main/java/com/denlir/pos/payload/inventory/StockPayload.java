package com.denlir.pos.payload.inventory;

import com.denlir.pos.common.GenerateTS;
import com.denlir.pos.payload.BasePayload;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;

/**
 * Created on: 3/4/20
 *
 * @author Denis Citaku
 **/
@GenerateTS
@Data
@EqualsAndHashCode(callSuper = true)
public class StockPayload extends BasePayload {

  private StockIdPayload stockId;

  private BigDecimal units;

  @Data
  public static class StockIdPayload {

    private String productId;

    private String locationId;

  }

}
