package com.denlir.pos.payload.inventory;

import annotation.FluentBuilder;
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
@FluentBuilder
@GenerateTS
@Data
@EqualsAndHashCode(callSuper = true)
public class StockPayload extends BasePayload {

  private StockIdPayload stockId;

  private BigDecimal units;

  @Data
  @FluentBuilder
  public static class StockIdPayload {

    private Long productId;

    private Long locationId;

  }

}
