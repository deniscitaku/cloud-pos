package com.denlir.pos.entity.inventory.movement.sale;

import com.denlir.pos.entity.inventory.BaseLineEntity;
import com.denlir.pos.entity.inventory.Tax;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.DBRef;
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

  private BigDecimal priceSell;

  @DBRef
  private Tax tax;

  private BigDecimal amount;

}
