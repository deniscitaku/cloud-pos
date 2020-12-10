package com.denlir.pos.entity;

import com.denlir.pos.entity.domain.User;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

import static javax.persistence.FetchType.LAZY;

/**
 * Created on: 4/13/20
 *
 * @author Denis Citaku
 **/

@Data
@EqualsAndHashCode(callSuper = true)
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseAuditEntity extends BaseEntity {

  @OneToOne(fetch = LAZY)
  @JoinColumn
  @LastModifiedBy
  private User modifiedByUser;

  @OneToOne(fetch = LAZY)
  @JoinColumn
  @CreatedBy
  private User createdByUser;

  @CreatedDate
  private LocalDateTime createdOn;

  @LastModifiedDate
  private LocalDateTime updatedOn;

}

