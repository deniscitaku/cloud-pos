package com.denlir.pos.service.inventory;

import com.denlir.pos.entity.inventory.Tax;
import com.denlir.pos.exception.EntityValidationException;
import com.denlir.pos.payload.domain.PagePayload;
import com.denlir.pos.payload.inventory.TaxMapper;
import com.denlir.pos.payload.inventory.TaxPayload;
import com.denlir.pos.repository.inventory.TaxRepository;
import com.denlir.pos.service.BasicServiceOperation;
import com.denlir.pos.validation.validators.UniqueValidator;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import static com.denlir.pos.service.FieldInclude.ofEntityAndMapper;

/**
 * Created on: 4/12/20
 *
 * @author Denis Citaku
 **/
@Service
public class TaxService extends BasicServiceOperation<Tax, TaxPayload, TaxRepository> {

  protected TaxService(TaxMapper taxMapper, TaxRepository repository) {
    super(taxMapper, repository);
  }

  @Override
  public PagePayload<TaxPayload> findAllPagedWithSearch(String search, PageRequest pageRequest, String... includeFields) {
    var pageWithSearch = repository.findAllPageableWithSearch(search, pageRequest)
        .map(x -> includeFields(ofEntityAndMapper(x, mapper, includeFields)));

    return PagePayload.fromPageable(pageWithSearch);
  }

  @Override
  protected void checkUniqueness(UniqueValidator<TaxRepository, TaxPayload> uniqueValidator) throws EntityValidationException {
    uniqueValidator
        .onCreate((r, p) -> p.isDefault() && r.existsByIsDefaultIsTrue())
        .onUpdate((r, p) -> p.isDefault() && r.existsByIsDefaultIsTrueAndIdIsNot(p.getId()))
        .withName("isDefault")
        .withValue(TaxPayload::isDefault)
        .end();
  }
}
