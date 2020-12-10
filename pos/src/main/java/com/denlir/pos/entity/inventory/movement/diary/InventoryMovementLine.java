package com.denlir.pos.entity.inventory.movement.diary;

import com.denlir.pos.entity.inventory.BaseLineEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

/**
 * Created on: 4/12/20
 *
 * @author Denis Citaku
 **/
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class InventoryMovementLine extends BaseLineEntity {

}