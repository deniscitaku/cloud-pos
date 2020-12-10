package com.denlir.pos.service.domain;

import com.denlir.pos.entity.domain.SequenceHolder;
import com.denlir.pos.entity.inventory.movement.MovementKind;
import com.denlir.pos.payload.BaseMapper;
import com.denlir.pos.payload.domain.SequenceHolderPayload;
import com.denlir.pos.repository.domain.SequenceHolderRepository;
import com.denlir.pos.service.BasicServiceOperation;
import org.springframework.stereotype.Service;

@Service
public class SequenceHolderService extends BasicServiceOperation<SequenceHolder, SequenceHolderPayload, SequenceHolderRepository> {

  protected SequenceHolderService(BaseMapper<SequenceHolder, SequenceHolderPayload> mapper, SequenceHolderRepository repository) {
    super(mapper, repository);
  }

  public Long getAndIncrementSequenceByIdAndMovementKind(Long id, MovementKind kind) {
    return repository.getAndIncrementSequenceByIdAndMovementKind(id, kind.toString());
  }

}