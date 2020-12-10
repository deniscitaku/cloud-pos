package com.denlir.pos.payload.inventory;

import com.denlir.pos.payload.BasePayload;
import com.denlir.pos.validation.groups.ReferenceId;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.groups.ConvertGroup;
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

  @NotNull
  @Valid
  private ProductPayload product;

  private BigDecimal priceBuy;

  private BigDecimal priceSell;

  @NotNull
  @Positive
  private BigDecimal quantity;

  private BigDecimal amount;

  private TaxPayload tax;

  @Valid
  @ConvertGroup(to = ReferenceId.class)
  private UomPayload uom;

  @JsonIgnore
  @Override
  public int compareTo(BaseLinePayload o) {
    return lineNumber.compareTo(o.lineNumber);
  }

}
