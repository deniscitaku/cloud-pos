package com.denlir.pos.payload.inventory;

import com.denlir.pos.common.GenerateTS;
import com.denlir.pos.payload.BaseAuditPayload;
import com.denlir.pos.validation.ValidName;
import com.denlir.pos.validation.groups.Sale;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.groups.Default;
import java.math.BigDecimal;

/**
 * Created on: 3/4/20
 *
 * @author Denis Citaku
 **/
@GenerateTS
@Data
@EqualsAndHashCode(callSuper = true)
public class ProductPayload extends BaseAuditPayload {

  @NotBlank
  private String code;

  @ValidName(groups = {Sale.class, Default.class})
  private String name;

  private String displayName;

  @NotNull
  @PositiveOrZero
  private BigDecimal priceBuy;

  @NotNull
  @Positive
  private BigDecimal priceSell;

  @NotNull(groups = {Sale.class, Default.class})
  @Positive(groups = {Sale.class, Default.class})
  private BigDecimal priceTax;

  @Valid
  private CategoryPayload category;

  @Valid
  @NotNull
  private TaxPayload tax;

  @Valid
  private UomPayload uom;

  private StockPayload stock;

  private int minStock;

}
