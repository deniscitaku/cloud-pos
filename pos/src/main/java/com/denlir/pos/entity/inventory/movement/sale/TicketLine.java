package com.denlir.pos.entity.inventory.movement.sale;

import com.denlir.pos.entity.inventory.BaseLineEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import static javax.persistence.FetchType.LAZY;

/**
 * Created on: 2/24/20
 *
 * @author Denis Citaku
 **/

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class TicketLine extends BaseLineEntity {

}
