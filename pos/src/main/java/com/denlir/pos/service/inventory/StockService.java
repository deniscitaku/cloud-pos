package com.denlir.pos.service.inventory;

import com.denlir.pos.entity.inventory.Stock;
import com.denlir.pos.entity.inventory.StockId;
import com.denlir.pos.entity.inventory.movement.MovementKind;
import com.denlir.pos.payload.inventory.BaseLinePayload;
import com.denlir.pos.payload.inventory.StockMapper;
import com.denlir.pos.payload.inventory.StockPayload;
import com.denlir.pos.repository.inventory.StockRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.Optional;

/**
 * Created on: 3/1/20
 *
 * @author Denis Citaku
 **/
@Service
public class StockService {

  private final StockMapper stockMapper;
  private final StockRepository repository;

  protected StockService(StockMapper stockMapper, StockRepository repository) {

    this.stockMapper = stockMapper;
    this.repository = repository;
  }

  private void updateStock(Stock stock, MovementKind kind) {
    repository.updateStockByStockId(stock.getStockId().getLocationId(), stock.getStockId().getProductId(), stock.getUnits().multiply(kind.getStockEffect()));
  }

  @Transactional
  public void updateStock(Collection<? extends BaseLinePayload> lines, Long locationId, MovementKind kind) {
    lines.stream()
        .map(x -> {
          Stock stock = new Stock();

          StockId stockId = new StockId();
          stockId.setProductId(x.getProduct().getId());
          stockId.setLocationId(locationId);

          stock.setStockId(stockId);
          stock.setUnits(x.getQuantity());

          return stock;
        })
        .forEach(x -> updateStock(x, kind));
  }

  public Collection<StockPayload> findAllById(Collection<StockId> ids) {
    return stockMapper.entitiesToPayloads(repository.findAllById(ids));
  }

  public Optional<StockPayload> findById(StockId stockId) {
    return repository.findById(stockId).map(stockMapper::entityToPayload);
  }
}
