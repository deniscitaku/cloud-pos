package com.denlir.pos.payload;

import com.denlir.pos.entity.inventory.SubCategory;
import com.denlir.pos.payload.inventory.SubCategoryPayload;
import org.mapstruct.IterableMapping;

import java.util.Collection;
import java.util.List;
import java.util.Set;

/**
 * Created on: 4/9/20
 *
 * @author Denis Citaku
 **/
public interface BaseMapper<E, P> {

  E payloadToEntity(P payload);

  P entityToPayload(E entity);

  @PartialMapper
  P partialEntityToPayload(E entity);

  @PartialMapper
  @IterableMapping(qualifiedBy = PartialMapper.class)
  Set<P> partialEntitiesToPayloads(Set<E> entity);

  @PartialMapper
  @IterableMapping(qualifiedBy = PartialMapper.class)
  List<P> partialEntitiesToPayloads(List<E> entity);

  Collection<E> payloadsToEntities(Collection<P> payloads);

  Collection<P> entitiesToPayloads(Collection<E> entities);

}
