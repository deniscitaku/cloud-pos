package com.denlir.pos.entity.domain;

import com.denlir.pos.entity.BaseEntity;
import com.denlir.pos.entity.inventory.movement.MovementKind;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import static javax.persistence.EnumType.STRING;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class SequenceHolder extends BaseEntity {

  @Enumerated(STRING)
  private MovementKind movementKind;

  private Long sequence;

}
