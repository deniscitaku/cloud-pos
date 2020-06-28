package com.denlir.pos.payload;

import com.denlir.pos.common.GenerateTypeScript;
import com.denlir.pos.entity.domain.User;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

/**
 * Created on: 4/13/20
 *
 * @author Denis Citaku
 **/
@GenerateTypeScript
@Data
@EqualsAndHashCode(callSuper = true)
public abstract class BaseAuditPayload extends BasePayload {

  private User modifiedByUser;

  private User createdByUser;

  private LocalDateTime createdOn;

  private LocalDateTime updatedOn;

}

