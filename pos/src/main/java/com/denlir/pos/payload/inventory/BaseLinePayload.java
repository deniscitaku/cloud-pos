package com.denlir.pos.payload.inventory;

import com.denlir.pos.payload.BasePayload;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import java.math.BigDecimal;

/**
 * Created on: 4/13/20
 *
 * @author Denis Citaku
 **/
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
public abstract class BaseLinePayload extends BasePayload implements Comparable<BaseLinePayload> {

  @NotNull
  @PositiveOrZero
  private Integer lineNumber;

  private ProductPayload product;

  private BigDecimal priceBuy;

  private BigDecimal quantity;

  @JsonIgnore
  @Override
  public int compareTo(BaseLinePayload o) {
    return lineNumber.compareTo(o.lineNumber);
  }

}
