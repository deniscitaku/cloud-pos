package com.denlir.pos.entity.inventory.movement.diary;

import com.denlir.pos.entity.inventory.BaseLineEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Created on: 4/12/20
 *
 * @author Denis Citaku
 **/
@Data
@EqualsAndHashCode(callSuper = true)
@Document("inventoryMovementLines")
public class InventoryMovementLine extends BaseLineEntity {

}