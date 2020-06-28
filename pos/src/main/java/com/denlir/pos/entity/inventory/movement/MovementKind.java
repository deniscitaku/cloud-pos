package com.denlir.pos.entity.inventory.movement;

import lombok.Getter;

import java.math.BigDecimal;

/**
 * Created on: 4/12/20
 *
 * @author Denis Citaku
 **/
public enum MovementKind {

  SALE(-1),

  TRANSFER(-1),

  EXPIRATION(-1),

  RETURN_SUPPLIER(-1),

  PURCHASE(1),

  REGISTRATION(1);

  @Getter
  private final BigDecimal stockEffect;

  MovementKind(int stockEffect) {
    this.stockEffect = new BigDecimal(stockEffect);
  }

}
