package com.denlir.pos.service.inventory.movement.sale;

import com.denlir.pos.entity.inventory.movement.sale.Customer;
import com.denlir.pos.payload.domain.PagePayload;
import com.denlir.pos.payload.inventory.movement.sale.CustomerMapper;
import com.denlir.pos.payload.inventory.movement.sale.CustomerPayload;
import com.denlir.pos.repository.inventory.movement.sale.CustomerRepository;
import com.denlir.pos.service.BasicServiceOperation;
import com.denlir.pos.validation.validators.Validator;
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
  protected void validate(Validator<CustomerPayload> validator) {
    validator
        .onCreate(p -> repository.existsByName(p.getName()))
        .onUpdate(p -> repository.existsByNameAndIdIsNot(p.getName(), p.getId()))
        .withName("name")
        .withValue(CustomerPayload::getName)
        .end();
  }

}
