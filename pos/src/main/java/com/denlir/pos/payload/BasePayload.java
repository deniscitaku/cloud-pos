package com.denlir.pos.payload;

import com.denlir.pos.common.GenerateTypeScript;
import com.denlir.pos.validation.groups.CascadeCreate;
import com.denlir.pos.validation.groups.Update;
import lombok.Data;

import javax.validation.constraints.NotEmpty;

/**
 * Created on: 4/13/20
 *
 * @author Denis Citaku
 **/
@Data
@GenerateTypeScript
public abstract class BasePayload {

  @NotEmpty(groups = {Update.class, CascadeCreate.class})
  private String id;

}
