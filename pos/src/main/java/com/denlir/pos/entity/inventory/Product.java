
package com.denlir.pos.entity.inventory;

import com.denlir.pos.entity.BaseAuditEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created on: 3/1/20
 *
 * @author Denis Citaku
 **/
@Data
@EqualsAndHashCode(callSuper = true)
@Document("products")
public class Product extends BaseAuditEntity {

  @Indexed(unique = true)
  private String code;

  @Indexed
  private String name;

  private String displayName;

  private BigDecimal priceBuy;

  private BigDecimal priceSell;

  private BigDecimal priceTax;

  @DBRef
  private Category category;

  @DBRef
  private Tax tax;

  @DBRef
  private List<Uom> uoms;

  @DBRef
  private Stock stock;

  private int minStock;

}
