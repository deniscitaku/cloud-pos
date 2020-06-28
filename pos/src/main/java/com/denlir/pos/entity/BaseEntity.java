package com.denlir.pos.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

/**
 * Created on: 4/13/20
 *
 * @author Denis Citaku
 **/
@Getter
@Setter
@EqualsAndHashCode
public abstract class BaseEntity {

  @Id
  private String id;

}
