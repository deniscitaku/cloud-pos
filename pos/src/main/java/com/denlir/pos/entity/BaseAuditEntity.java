package com.denlir.pos.entity;

import com.denlir.pos.entity.domain.User;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.time.LocalDateTime;

/**
 * Created on: 4/13/20
 *
 * @author Denis Citaku
 **/
@Data
@EqualsAndHashCode(callSuper = true)
public abstract class BaseAuditEntity extends BaseEntity {

  @DBRef
  @LastModifiedBy
  private User modifiedByUser;

  @DBRef
  @CreatedBy
  private User createdByUser;

  @CreatedDate
  private LocalDateTime createdOn;

  @LastModifiedDate
  private LocalDateTime updatedOn;

}

