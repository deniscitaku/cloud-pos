package com.denlir.pos.service.inventory;

import com.denlir.pos.entity.inventory.Product;
import com.denlir.pos.exception.EntityValidationException;
import com.denlir.pos.payload.domain.PagePayload;
import com.denlir.pos.payload.inventory.ProductMapper;
import com.denlir.pos.payload.inventory.ProductPayload;
import com.denlir.pos.payload.inventory.UomMapper;
import com.denlir.pos.repository.inventory.ProductRepository;
import com.denlir.pos.service.BasicServiceOperation;
import com.denlir.pos.service.FieldInclude;
import com.denlir.pos.validation.validators.UniqueValidator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;

import static com.denlir.pos.service.FieldInclude.ofEntityAndMapper;

/**
 * Created on: 3/15/20
 *
 * @author Denis Citaku
 **/
@Slf4j
@Service
public class ProductService extends BasicServiceOperation<Product, ProductPayload, ProductRepository> {

  private final UomMapper uomMapper;

  protected ProductService(ProductMapper productMapper, ProductRepository repository, UomMapper uomMapper) {
    super(productMapper, repository);
    this.uomMapper = uomMapper;
  }

  public Collection<ProductPayload> findAllByCodeOrName(String codeOrName) {
    List<Product> products = repository.findAllByCodeContainingIgnoreCaseOrNameContainingIgnoreCase(codeOrName, codeOrName);
    return mapper.entitiesToPayloads(products);
  }

  public List<ProductPayload> findAllByCategoryId(Long categoryId) {
    return mapper.partialEntitiesToPayloads(repository.findAllByCategoryId(categoryId));
  }

  public List<ProductPayload> findAllBySubCategoryId(Long categoryId) {
    return mapper.partialEntitiesToPayloads(repository.findAllBySubCategoryId(categoryId));
  }

  public ProductPayload findByCode(String code) {
    return mapper.entityToPayload(repository.findByCode(code));
  }

  @Override
  public PagePayload<ProductPayload> findAllPagedWithSearch(String search, PageRequest pageRequest, String... includeFields) {
    var pageWithSearch = repository.findAllPageableWithSearch(search, pageRequest)
        .map(x -> includeFields(ofEntityAndMapper(x, mapper, includeFields)));

    return PagePayload.fromPageable(pageWithSearch);
  }

  @Override
  protected ProductPayload beforeSave(ProductPayload payload) {
    if (payload.getPriceTax() == null) {
      BigDecimal priceTax = payload.getPriceSell().multiply(payload.getTax().getTaxRate());
      payload.setPriceTax(priceTax);
    }

    return payload;
  }

  @Override
  protected void checkUniqueness(UniqueValidator<ProductRepository, ProductPayload> uniqueValidator) throws EntityValidationException {
    uniqueValidator
        .onCreate((r, p) -> r.existsByCode(p.getCode()))
        .onUpdate((r, p) -> r.existsByCodeAndIdIsNot(p.getCode(), p.getId()))
        .withName("code")
        .withValue(ProductPayload::getCode)
        .end();
  }

  @Override
  public ProductPayload includeFields(FieldInclude<Product, ProductPayload> fieldInclude) {
    return fieldInclude
        .includeAuditFields()
        .and()
        .ofField("uoms")
        .withGetter(Product::getUoms)
        .map(uomMapper::entitiesToPayloads)
        .withSetter((p, x) -> p.setUoms(new HashSet<>(x)))
        .get();
  }

}
