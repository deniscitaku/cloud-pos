package com.denlir.pos.service;

import com.denlir.pos.exception.EntityDatabaseValidationException;
import com.denlir.pos.payload.BaseMapper;
import org.springframework.data.mongodb.core.ReactiveMongoOperations;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

/**
 * Created on: 3/15/20
 *
 * @author Denis Citaku
 **/
public abstract class BasicServiceOperation<E, P, U extends ReactiveMongoRepository<E, String>> {

  protected final BaseMapper<E, P> mapper;

  protected final U repository;

  protected final ReactiveMongoOperations reactiveOps;

  protected BasicServiceOperation(BaseMapper<E, P> mapper, U repository, ReactiveMongoOperations reactiveOps) {
    this.mapper = mapper;
    this.repository = repository;
    this.reactiveOps = reactiveOps;
  }

  public Mono<P> findById(String id) {
    return repository.findById(id)
        .map(mapper::entityToPayload);
  }

  public Flux<P> findAll() {
    return repository.findAll()
        .map(mapper::entityToPayload);
  }

  public Mono<P> create(P payload) throws EntityDatabaseValidationException {
    return doDatabaseValidationOn(payload, CrudOperation.CREATE)
            .map(mapper::payloadToEntity)
            .flatMap(repository::insert)
            .map(mapper::entityToPayload);
  }

  public Mono<P> update(P payload) {
    return doDatabaseValidationOn(payload, CrudOperation.UPDATE)
            .map(mapper::payloadToEntity)
            .flatMap(repository::save)
            .map(mapper::entityToPayload);
  }

  public Flux<P> insertAll(List<P> payloads) {
    List<E> entities = mapper.payloadsToEntities(payloads);
    return reactiveOps.insertAll(entities)
        .map(mapper::entityToPayload);
  }

  public Mono<Void> delete(P payload) {
    E entity = mapper.payloadToEntity(payload);
    return repository.delete(entity);
  }

  public Mono<Void> deleteById(String id) {
    return repository.deleteById(id);
  }

  /**
   * This method is used when we need a database validation, for example check for duplicity
   */
  protected Mono<P> doDatabaseValidationOn(P payload, CrudOperation crudOperation) {
    return Mono.just(payload);
  }

  protected enum CrudOperation {

    CREATE,

    UPDATE

  }

}
