package com.denlir.pos.service.inventory;

import com.denlir.pos.entity.inventory.Uom;
import com.denlir.pos.payload.domain.PagePayload;
import com.denlir.pos.payload.inventory.UomMapper;
import com.denlir.pos.payload.inventory.UomPayload;
import com.denlir.pos.repository.inventory.UomRepository;
import com.denlir.pos.service.BasicServiceOperation;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import static com.denlir.pos.service.FieldInclude.ofEntityAndMapper;

/**
 * Created on: 4/12/20
 *
 * @author Denis Citaku
 **/
@Service
public class UomService extends BasicServiceOperation<Uom, UomPayload, UomRepository> {

  protected UomService(UomMapper uomMapper, UomRepository repository) {
    super(uomMapper, repository);
  }

  @Override
  public PagePayload<UomPayload> findAllPagedWithSearch(String search, PageRequest pageRequest, String... includeFields) {
    return PagePayload.fromPageable(repository.findAllPageableWithSearch(search, pageRequest)
        .map(x -> includeFields(ofEntityAndMapper(x, mapper, includeFields))));
  }
}