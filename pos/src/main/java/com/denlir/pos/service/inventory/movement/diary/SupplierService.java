package com.denlir.pos.service.inventory.movement.diary;

import com.denlir.pos.entity.inventory.movement.diary.Supplier;
import com.denlir.pos.payload.domain.PagePayload;
import com.denlir.pos.payload.inventory.movement.diary.SupplierMapper;
import com.denlir.pos.payload.inventory.movement.diary.SupplierPayload;
import com.denlir.pos.repository.inventory.movement.diary.SupplierRepository;
import com.denlir.pos.service.BasicServiceOperation;
import com.denlir.pos.validation.validators.Validator;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import static com.denlir.pos.service.FieldInclude.ofEntityAndMapper;

/**
 * Created on: 4/13/20
 *
 * @author Denis Citaku
 **/
@Service
public class SupplierService extends BasicServiceOperation<Supplier, SupplierPayload, SupplierRepository> {

  protected SupplierService(SupplierMapper supplierMapper, SupplierRepository repository) {
    super(supplierMapper, repository);
  }

  @Override
  public PagePayload<SupplierPayload> findAllPagedWithSearch(String search, PageRequest pageRequest, String... includeFields) {
    var pageWithSearch = repository.findAllPageableWithSearch(search, pageRequest)
        .map(x -> includeFields(ofEntityAndMapper(x, mapper, includeFields)));

    return PagePayload.fromPageable(pageWithSearch);
  }

  @Override
  protected void validate(Validator<SupplierPayload> validator) {
    validator.onCreate(p -> repository.existsByName(p.getName()))
        .onUpdate(p-> repository.existsByNameAndIdIsNot(p.getName(), p.getId()))
        .withName("name")
        .withValue(SupplierPayload::getName)
        .end();
  }

}
