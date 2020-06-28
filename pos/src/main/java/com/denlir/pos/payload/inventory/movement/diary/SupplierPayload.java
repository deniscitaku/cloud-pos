package com.denlir.pos.payload.inventory.movement.diary;

import com.denlir.pos.common.GenerateTypeScript;
import com.denlir.pos.payload.BaseAuditPayload;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Created on: 4/13/20
 *
 * @author Denis Citaku
 **/
@Data
@EqualsAndHashCode(callSuper = true)
@GenerateTypeScript
public class SupplierPayload extends BaseAuditPayload {

  private String id;

  private String name;

  private String nui;

  private String phoneNumber;

  private String email;

}