package com.denlir.pos.payload.inventory;

import com.denlir.pos.common.GenerateTS;
import com.denlir.pos.payload.BasePayload;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.math.BigDecimal;

/**
 * Created on: 3/4/20
 *
 * @author Denis Citaku
 **/
@GenerateTS
@Data
@EqualsAndHashCode(callSuper = true)
public class UomPayload extends BasePayload {

  @NotNull
  @Size(min = 1, max = 100)
  private String smallerUnitName;

  @NotNull
  @Size(min = 1, max = 100)
  private String biggerUnitName;

  @NotNull
  @Positive
  private BigDecimal convertValue;

}
