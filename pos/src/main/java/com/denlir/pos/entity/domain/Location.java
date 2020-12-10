package com.denlir.pos.entity.domain;

import com.denlir.pos.entity.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import java.util.Set;

import static javax.persistence.CascadeType.*;
import static javax.persistence.FetchType.EAGER;

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

  @OneToMany(orphanRemoval = true, cascade = {REMOVE, PERSIST}, fetch = EAGER)
  @JoinColumn
  private Set<SequenceHolder> sequenceHolders;

}

