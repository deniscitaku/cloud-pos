package com.denlir.pos.controller;

import com.denlir.pos.common.GenerateTS;
import com.denlir.pos.payload.BasePayload;
import com.denlir.pos.payload.domain.PagePayload;
import com.denlir.pos.service.BasicServiceOperation;
import com.denlir.pos.validation.groups.Update;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.groups.Default;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * Created on: 4/10/20
 *
 * @author Denis Citaku
 **/
@GenerateTS
public abstract class BasicControllerOperations<T extends BasicServiceOperation<?, P, ?>, P extends BasePayload> {

  protected final T service;

  protected BasicControllerOperations(T service) {
    this.service = service;
  }

  @GetMapping("/{id}")
  public Optional<P> findById(@PathVariable @NotEmpty Long id,
                              @RequestParam(required = false) String... include) {
    return service.findById(id, include);
  }

  @GetMapping("/all")
  public Collection<P> findAll(@RequestParam(required = false) String... include) {
    return service.findAll(include);
  }

  @GetMapping("/paged")
  public PagePayload<P> findAllPaged(@RequestParam int page,
                                     @RequestParam int size,
                                     @RequestParam(required = false) String[] sortBy,
                                     @RequestParam(required = false) String direction,
                                     @RequestParam(required = false) String search,
                                     @RequestParam(required = false) String... include) {
    return service.findAllPaged(page, size, sortBy, direction, search, include);
  }

  @GetMapping("/sorted")
  public Collection<P> findAllSorted(@RequestParam String direction, @RequestParam String[] sortBy, @RequestParam(required = false) String... include) {
    return service.findAllSorted(direction, sortBy, include);
  }

  @PostMapping
  public P create(@RequestBody @Validated P payload) {
    return service.save(payload);
  }

  @PostMapping("/all")
  public Collection<P> createAll(@RequestBody @Validated List<P> payload) {
    return service.saveAll(payload);
  }

  @PutMapping P update(@RequestBody @Validated({Default.class, Update.class}) P payload) {
    return service.save(payload);
  }

  @PutMapping("/all")
  public Collection<P> updateAll(@RequestBody @Validated({Default.class, Update.class}) List<P> payload) {
    return service.saveAll(payload);
  }

  @DeleteMapping("/{id}")
  public void deleteById(@PathVariable @NotEmpty Long id) {
    service.deleteById(id);
  }

  @DeleteMapping
  public void deleteAll(@RequestBody @Valid List<P> payloads) {
    service.deleteAll(payloads);
  }

}
