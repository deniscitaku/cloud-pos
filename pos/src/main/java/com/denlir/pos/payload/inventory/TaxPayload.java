package com.denlir.pos.payload.inventory;

import com.denlir.pos.common.GenerateTS;
import com.denlir.pos.payload.BasePayload;
import com.denlir.pos.validation.Tax;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.math.BigDecimal;

/**
 * Created on: 3/4/20
 *
 * @author Denis Citaku
 **/
@GenerateTS
@Data
@EqualsAndHashCode(callSuper = true)
public class TaxPayload extends BasePayload {

  @Tax
  private String name;

  @NotNull
  @Positive
  private BigDecimal taxRate;

}
