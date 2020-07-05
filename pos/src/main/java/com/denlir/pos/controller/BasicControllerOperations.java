package com.denlir.pos.controller;

import com.denlir.pos.common.GenerateTS;
import com.denlir.pos.service.BasicServiceOperation;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;

/**
 * Created on: 4/10/20
 *
 * @author Denis Citaku
 **/
@GenerateTS
public abstract class BasicControllerOperations<T extends BasicServiceOperation<?, P, ?>, P> {

  protected final T service;

  protected BasicControllerOperations(T service) {
    this.service = service;
  }

  @GetMapping("/{id}")
  public Mono<P> findById(@PathVariable @NotEmpty String id) {
    return service.findById(id);
  }

  @GetMapping("/all")
  public Flux<P> findAll() {
    return service.findAll();
  }

  @PostMapping
  public Mono<P> create(@RequestBody @Valid P payload) {
    return service.create(payload);
  }

  @PutMapping
  public Mono<P> update(@RequestBody @Valid P payload) {
    return service.update(payload);
  }

  @DeleteMapping("/{id}")
  public Mono<Void> deleteById(@PathVariable @NotEmpty String id) {
    return service.deleteById(id);
  }

  @DeleteMapping
  public Mono<Void> delete(@RequestBody @Valid P payload) {
    return service.delete(payload);
  }

}
