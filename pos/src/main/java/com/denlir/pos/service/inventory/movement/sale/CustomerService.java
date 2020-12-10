package com.denlir.pos.service.inventory.movement.sale;

import com.denlir.pos.entity.inventory.movement.sale.Customer;
import com.denlir.pos.exception.EntityValidationException;
import com.denlir.pos.exception.ValidationExceptionFluentBuilder;
import com.denlir.pos.payload.domain.PagePayload;
import com.denlir.pos.payload.inventory.movement.diary.SupplierPayload;
import com.denlir.pos.payload.inventory.movement.sale.CustomerMapper;
import com.denlir.pos.payload.inventory.movement.sale.CustomerPayload;
import com.denlir.pos.repository.inventory.movement.sale.CustomerRepository;
import com.denlir.pos.service.BasicServiceOperation;
import com.denlir.pos.validation.validators.UniqueValidator;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import static com.denlir.pos.service.FieldInclude.ofEntityAndMapper;

@Service
public class CustomerService extends BasicServiceOperation<Customer, CustomerPayload, CustomerRepository> {

  protected CustomerService(CustomerMapper mapper, CustomerRepository repository) {
    super(mapper, repository);
  }

  @Override
  public PagePayload<CustomerPayload> findAllPagedWithSearch(String search, PageRequest pageRequest, String... includeFields) {
    var pageWithSearch = repository.findAllPageableWithSearch(search, pageRequest)
        .map(x -> includeFields(ofEntityAndMapper(x, mapper, includeFields)));

    return PagePayload.fromPageable(pageWithSearch);
  }

  @Override
  protected void checkUniqueness(UniqueValidator<CustomerRepository, CustomerPayload> uniqueValidator) {
    uniqueValidator
        .onCreate((r, p) -> r.existsByName(p.getName()))
        .onUpdate((r, p) -> r.existsByNameAndIdIsNot(p.getName(), p.getId()))
        .withName("name")
        .withValue(CustomerPayload::getName)
        .end();
  }

}
