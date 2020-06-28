package com.denlir.pos.repository.inventory.movement.sale;

import com.denlir.pos.entity.inventory.movement.sale.Ticket;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

/**
 * Created on: 4/10/20
 *
 * @author Denis Citaku
 **/
public interface TicketRepository extends ReactiveMongoRepository<Ticket, String> {
}
