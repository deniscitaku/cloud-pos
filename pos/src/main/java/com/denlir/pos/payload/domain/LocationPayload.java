package com.denlir.pos.payload.domain;

import annotation.FluentBuilder;
import annotation.FluentBuilder.Optional;
import com.denlir.pos.common.GenerateTS;
import com.denlir.pos.payload.BasePayload;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.constraints.NotEmpty;
import java.util.HashSet;
import java.util.Set;

/**
 * Created on: 3/4/20
 *
 * @author Denis Citaku
 **/
@FluentBuilder
@Data
@EqualsAndHashCode(callSuper = true)
@GenerateTS
public class LocationPayload extends BasePayload {

  @NotEmpty
  private String name;

  @Optional
  private Set<SequenceHolderPayload> sequenceHolders = new HashSet<>();

  public void addSequenceHolder(SequenceHolderPayload sequenceHolder) {
    sequenceHolders.add(sequenceHolder);
  }

}
