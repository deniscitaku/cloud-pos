package com.denlir.pos.entity.inventory.movement.sale;

import com.denlir.pos.entity.inventory.BaseLineEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;

/**
 * Created on: 2/24/20
 *
 * @author Denis Citaku
 **/

@Data
@EqualsAndHashCode(callSuper = true)
@Document("ticketLines")
public class TicketLine extends BaseLineEntity {

}
