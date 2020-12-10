package com.denlir.pos.entity;

import lombok.Data;

import javax.persistence.*;

/**
 * Created on: 4/13/20
 *
 * @author Denis Citaku
 **/
@Data
@MappedSuperclass
public abstract class BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

}
