package com.denlir.pos.payload.inventory;

import annotation.FluentBuilder;
import com.denlir.pos.common.GenerateTS;
import com.denlir.pos.payload.BaseAuditPayload;
import com.denlir.pos.validation.ValidName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import java.math.BigDecimal;
import java.util.Set;

import static annotation.FluentBuilder.Optional;

/**
 * Created on: 3/4/20
 *
 * @author Denis Citaku
 **/
@FluentBuilder
@GenerateTS
@Data
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = true)
public class ProductPayload extends BaseAuditPayload {

  @NotBlank
  private String code;

  @ValidName
  private String name;

  @Optional
  private String displayName;

  @NotNull
  @PositiveOrZero
  private BigDecimal priceBuy;

  @NotNull
  @Positive
  private BigDecimal priceSell;

  private BigDecimal priceTax;

  @Valid
  private CategoryPayload category;

  @Valid
  private SubCategoryPayload subCategory;

  @Valid
  @NotNull
  private TaxPayload tax;

  @Valid
  @Optional
  private Set<UomPayload> uoms;

  @Optional
  private BigDecimal minStock;

}
