package com.denlir.pos.payload;

import annotation.FluentBuilder.Optional;
import com.denlir.pos.common.GenerateTS;
import com.denlir.pos.validation.groups.ReferenceId;
import com.denlir.pos.validation.groups.Update;
import lombok.Data;

import javax.validation.constraints.NotNull;

/**
 * Created on: 4/13/20
 *
 * @author Denis Citaku
 **/
@Data
@GenerateTS
public abstract class BasePayload {

  @Optional
  @NotNull(groups = {Update.class, ReferenceId.class})
  private Long id;

}
