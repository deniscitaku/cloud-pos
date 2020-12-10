package com.denlir.pos.service.inventory;

import com.denlir.pos.entity.inventory.Stock;
import com.denlir.pos.entity.inventory.StockId;
import com.denlir.pos.entity.inventory.movement.MovementKind;
import com.denlir.pos.payload.inventory.BaseLinePayload;
import com.denlir.pos.payload.inventory.StockMapper;
import com.denlir.pos.payload.inventory.StockPayload;
import com.denlir.pos.repository.inventory.StockRepository;
import com.denlir.pos.service.BasicServiceOperation;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.List;

/**
 * Created on: 3/1/20
 *
 * @author Denis Citaku
 **/
@Service
public class StockService extends BasicServiceOperation<Stock, StockPayload, StockRepository> {

  protected StockService(StockMapper stockMapper, StockRepository repository) {
    super(stockMapper, repository);
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

}
