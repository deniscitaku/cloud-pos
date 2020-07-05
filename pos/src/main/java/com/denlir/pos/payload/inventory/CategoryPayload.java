package com.denlir.pos.payload.inventory;

import com.denlir.pos.common.GenerateTS;
import com.denlir.pos.payload.BasePayload;
import com.denlir.pos.validation.ValidName;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Created on: 3/16/20
 *
 * @author Denis Citaku
 **/
@GenerateTS
@Data
@EqualsAndHashCode(callSuper = true)
public class CategoryPayload extends BasePayload {

  @ValidName
  private String name;

}
