package com.denlir.pos.payload;

import java.util.List;

/**
 * Created on: 4/9/20
 *
 * @author Denis Citaku
 **/
public interface BaseMapper<E, P> {

  E payloadToEntity(P payload);

  P entityToPayload(E entity);

  List<E> payloadsToEntities(List<P> payloads);

  List<P> entitiesToPayloads(List<E> entities);

}
