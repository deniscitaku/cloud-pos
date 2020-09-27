package com.denlir.pos.service.inventory;

import com.denlir.pos.entity.inventory.Stock;
import com.denlir.pos.entity.inventory.StockId;
import com.denlir.pos.entity.inventory.movement.MovementKind;
import com.denlir.pos.payload.inventory.BaseLinePayload;
import com.denlir.pos.payload.inventory.StockMapper;
import com.denlir.pos.payload.inventory.StockPayload;
import com.denlir.pos.repository.inventory.StockRepository;
import com.denlir.pos.service.BasicServiceOperation;
import org.springframework.data.mongodb.core.ReactiveMongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Query.query;

/**
 * Created on: 3/1/20
 *
 * @author Denis Citaku
 **/
@Service
public class StockService extends BasicServiceOperation<Stock, StockPayload, StockRepository> {

  protected StockService(StockMapper stockMapper,
                         StockRepository repository,
                         ReactiveMongoOperations mongoOperations) {
    super(stockMapper, repository, mongoOperations);
  }

  public Mono<Stock> updateStock(Stock stock, MovementKind kind) {
    return reactiveOps.findAndModify(
        query(Criteria.where("stockId").is(stock.getStockId())),
        new Update().inc("units", stock.getUnits().multiply(kind.getStockEffect()).doubleValue()),
        options().returnNew(true).upsert(true),
        Stock.class);
  }

  public Flux<Stock> updateStock(List<? extends BaseLinePayload> lines, String locationId, MovementKind kind) {
    return Flux.fromStream(lines.stream())
        .map(x -> {
          Stock stock = new Stock();

          StockId stockId = new StockId();
          stockId.setProductId(x.getProduct().getId());
          stockId.setLocationId(locationId);

          stock.setStockId(stockId);
          stock.setUnits(x.getQuantity());

          return stock;
        })
        .flatMap(x -> updateStock(x, kind));
  }

}
