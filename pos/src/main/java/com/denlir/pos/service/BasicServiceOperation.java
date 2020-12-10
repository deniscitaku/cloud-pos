package com.denlir.pos.service;

import com.denlir.pos.exception.EntityValidationException;
import com.denlir.pos.payload.BaseMapper;
import com.denlir.pos.payload.domain.PagePayload;
import com.denlir.pos.validation.validators.UniqueValidator;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static com.denlir.pos.service.FieldInclude.ofEntityAndMapper;

/**
 * Created on: 3/15/20
 *
 * @author Denis Citaku
 **/
public abstract class BasicServiceOperation<E, P, R extends JpaRepository<E, Long>> {

  protected final BaseMapper<E, P> mapper;

  protected final R repository;

  protected BasicServiceOperation(BaseMapper<E, P> mapper, R repository) {
    this.mapper = mapper;
    this.repository = repository;
  }

  @Transactional
  public P getOne(Long id, String... includeFields) {
    E entity = repository.getOne(id);
    return includeFields(ofEntityAndMapper(entity, mapper, includeFields));
  }

  @Transactional
  public Optional<P> findById(Long id, String... includeFields) {
    return repository.findById(id)
        .map(x -> includeFields(ofEntityAndMapper(x, mapper, includeFields)));
  }

  @Transactional
  public Collection<P> findAll(String... includeFields) {
    return repository.findAll().stream()
        .map(x -> includeFields(ofEntityAndMapper(x, mapper, includeFields)))
        .collect(Collectors.toList());
  }

  @Transactional
  public Collection<P> findAllSorted(String direction, String[] sortBy, String... includeFields) {
    Sort sort = Sort.by(Sort.Direction.fromString(direction), sortBy);
    return repository.findAll(sort).stream()
        .map(x -> includeFields(ofEntityAndMapper(x, mapper, includeFields)))
        .collect(Collectors.toList());
  }

  @Transactional
  public PagePayload<P> findAllPaged(int page, int size, String[] sortBy, String direction, String search, String... includeFields) {
    if (search == null || search.isEmpty()) {
      return PagePayload.fromPageable(repository.findAll(buildPageRequest(page, size, direction, sortBy))
          .map(x -> includeFields(ofEntityAndMapper(x, mapper, includeFields))));
    }
    return findAllPagedWithSearch(searchFormatter(search), buildPageRequest(page, size, direction, sortBy), includeFields);
  }

  @Transactional
  public Collection<P> findAllById(Collection<Long> ids, String... includeFields) {
    return repository.findAllById(ids).stream()
        .map(x -> includeFields(ofEntityAndMapper(x, mapper, includeFields)))
        .collect(Collectors.toList());
  }

  @Transactional
  public P save(P payload) throws EntityValidationException {
    checkUniqueness(UniqueValidator.of(repository, payload));
    P p = beforeSave(payload);
    E entity = mapper.payloadToEntity(p);
    return mapper.partialEntityToPayload(repository.save(entity));
  }

  @Transactional
  public Collection<P> saveAll(Collection<P> payloads) {
    Collection<P> beforeSavePayloads = payloads.stream()
        .peek(x -> checkUniqueness(UniqueValidator.of(repository, x)))
        .map(this::beforeSave)
        .collect(Collectors.toList());

    Collection<E> entities = mapper.payloadsToEntities(beforeSavePayloads);
    return mapper.partialEntitiesToPayloads(repository.saveAll(entities));
  }

  public void deleteById(Long id) {
    repository.deleteById(id);
  }

  @Transactional
  public void deleteAll(Collection<P> payloads) {
    Collection<E> entities = mapper.payloadsToEntities(payloads);
    repository.deleteAll(entities);
  }

  public void deleteAll() {
    repository.deleteAll();
  }

  public P includeFields(FieldInclude<E, P> fieldInclude) {
    return fieldInclude.getPayload();
  }

  protected P beforeSave(P payload) {
    return payload;
  }

  /**
   * Implement this method to have the search functionality
   */
  public PagePayload<P> findAllPagedWithSearch(String search, PageRequest pageRequest, String... includeFields) {
    return PagePayload.fromPageable(repository.findAll(pageRequest)
        .map(x -> includeFields(ofEntityAndMapper(x, mapper, includeFields))));
  }

  /**
   * This method is used when we need a database validation, for example check for duplicity
   */
  protected void checkUniqueness(UniqueValidator<R, P> uniqueValidator) throws EntityValidationException {
  }

  private PageRequest buildPageRequest(int page, int size, String direction, String... properties) {
    if (size == 0) {
      size = 10;
    }

    if (direction == null || properties == null || properties.length == 0) {
      return PageRequest.of(page, size, Sort.unsorted());
    }

    try {
      String[] formattedProperties = Stream.of(properties).map(x -> String.format("%s", x)).toArray(String[]::new);
      return PageRequest.of(page, size, Sort.Direction.fromString(direction), formattedProperties);
    } catch (IllegalArgumentException iae) {
      return PageRequest.of(page, size, Sort.unsorted());
    }
  }

  private String searchFormatter(String search) {
    return "%" + search.toLowerCase() + "%";
  }

}
