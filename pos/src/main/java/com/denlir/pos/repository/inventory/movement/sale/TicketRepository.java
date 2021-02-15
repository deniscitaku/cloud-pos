package com.denlir.pos.repository.inventory.movement.sale;

import com.denlir.pos.entity.inventory.movement.sale.Status;
import com.denlir.pos.entity.inventory.movement.sale.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

/**
 * Created on: 4/10/20
 *
 * @author Denis Citaku
 **/
public interface TicketRepository extends JpaRepository<Ticket, Long> {

  List<Ticket> findByStatusOrderByCreatedOn(Status status);

}
