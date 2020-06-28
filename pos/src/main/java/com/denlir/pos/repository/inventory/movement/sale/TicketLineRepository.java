package com.denlir.pos.repository.inventory.movement.sale;

import com.denlir.pos.entity.inventory.movement.sale.TicketLine;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

/**
 * Created on: 2/29/20
 *
 * @author Denis Citaku
 **/
public interface TicketLineRepository extends ReactiveMongoRepository<TicketLine, String> {
}
