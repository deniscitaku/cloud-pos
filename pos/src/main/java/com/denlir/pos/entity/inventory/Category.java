package com.denlir.pos.entity.inventory;

import com.denlir.pos.entity.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString.Exclude;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.Set;

import static javax.persistence.CascadeType.MERGE;
import static javax.persistence.CascadeType.PERSIST;
import static javax.persistence.CascadeType.REMOVE;

/**
 * Created on: 3/16/20
 *
 * @author Denis Citaku
 **/
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true, exclude = "subCategories")
@Entity
public class Category extends BaseEntity {

  @Column(unique = true)
  private String name;

  @Exclude
  @ElementCollection
  @OneToMany(cascade = {REMOVE, PERSIST}, mappedBy = "category")
  private Set<SubCategory> subCategories;

  public void setSubCategories(Set<SubCategory> subCategories) {
    if (this.subCategories == null) {
      this.subCategories = subCategories;
    } else {
      this.subCategories.addAll(subCategories);
    }
  }
}
