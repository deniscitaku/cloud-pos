package com.denlir.pos.entity.domain;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

/**
 * Created on: 4/12/20
 *
 * @author Denis Citaku
 **/
@Document
public class User {

  @Id
  private String id;

  private String name;

  private String phoneNumber;

  private String email;

  @CreatedDate
  private LocalDateTime createdOn;

  @LastModifiedDate
  private LocalDateTime updatedOn;

}
