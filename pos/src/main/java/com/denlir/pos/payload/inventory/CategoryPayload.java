package com.denlir.pos.payload.inventory;

import annotation.FluentBuilder;
import annotation.FluentBuilder.Optional;
import com.denlir.pos.common.GenerateTS;
import com.denlir.pos.payload.BasePayload;
import com.denlir.pos.validation.ValidName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString.Exclude;
import lombok.experimental.Accessors;

import java.util.Set;

@GenerateTS
@Data
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = true)
@FluentBuilder
public class CategoryPayload extends BasePayload {

  @ValidName
  private String name;

  @Optional
  @Exclude
  private Set<SubCategoryPayload> subCategories;

}
