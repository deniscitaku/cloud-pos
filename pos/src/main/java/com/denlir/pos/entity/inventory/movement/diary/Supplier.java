package com.denlir.pos.entity.inventory.movement.diary;

import com.denlir.pos.entity.BaseAuditEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Created on: 4/13/20
 *
 * @author Denis Citaku
 **/
@Data
@EqualsAndHashCode(callSuper = true)
@Document("suppliers")
public class Supplier extends BaseAuditEntity {

  private String name;

  private String nui;

  private String phoneNumber;

  private String email;

}
