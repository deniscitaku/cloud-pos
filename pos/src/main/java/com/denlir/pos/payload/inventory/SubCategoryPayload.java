package com.denlir.pos.payload.inventory;

import annotation.FluentBuilder;
import com.denlir.pos.common.GenerateTS;
import com.denlir.pos.payload.BasePayload;
import com.denlir.pos.validation.ValidName;
import com.denlir.pos.validation.groups.ReferenceId;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.groups.ConvertGroup;

@GenerateTS
@Data
@EqualsAndHashCode(callSuper = true)
@FluentBuilder
public class SubCategoryPayload extends BasePayload {

  @ValidName
  private String name;

  @Valid
  @NotNull
  @ConvertGroup(to = ReferenceId.class)
  private CategoryPayload category;

}
