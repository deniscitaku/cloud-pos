package com.denlir.pos.repository.inventory;

import com.denlir.pos.entity.inventory.Stock;
import com.denlir.pos.entity.inventory.StockId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.Optional;

/**
 * Created on: 3/15/20
 *
 * @author Denis Citaku
 **/
public interface StockRepository extends JpaRepository<Stock, StockId> {

    @Modifying
    @Query(value = "INSERT INTO stock (location_id, product_id, units) VALUES (?1, ?2, ?3) ON CONFLICT (location_id, product_id) DO UPDATE SET units = stock.units + ?3", nativeQuery = true)
    void updateStockByStockId(Long locationId, Long productId, BigDecimal units);

}
