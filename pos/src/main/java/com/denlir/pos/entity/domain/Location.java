package com.denlir.pos.entity.domain;

import com.denlir.pos.entity.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import java.util.Set;

import static javax.persistence.CascadeType.MERGE;
import static javax.persistence.CascadeType.PERSIST;
import static javax.persistence.CascadeType.REMOVE;

/**
 * Created on: 3/1/20
 *
 * @author Denis Citaku
 **/
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Location extends BaseEntity {

  private String name;

  @OneToMany(orphanRemoval = true, cascade = {REMOVE, PERSIST, MERGE})
  @JoinColumn(name = "location_id", nullable = false)
  private Set<SequenceHolder> sequenceHolders;

}

