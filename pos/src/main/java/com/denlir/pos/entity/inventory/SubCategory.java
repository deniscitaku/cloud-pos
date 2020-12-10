package com.denlir.pos.entity.inventory;

import com.denlir.pos.entity.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Data
@Entity
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true, exclude = "category")
public class SubCategory extends BaseEntity {

  @Column(unique = true)
  private String name;

  @ManyToOne(optional = false)
  @JoinColumn
  private Category category;

}
