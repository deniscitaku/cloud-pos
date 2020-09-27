package com.denlir.pos.service.inventory;

import com.denlir.pos.entity.inventory.Product;
import com.denlir.pos.exception.ValidationExceptionPayload;
import com.denlir.pos.payload.inventory.ProductMapper;
import com.denlir.pos.payload.inventory.ProductPayload;
import com.denlir.pos.repository.inventory.ProductRepository;
import com.denlir.pos.service.BasicServiceOperation;
import org.springframework.data.mongodb.core.ReactiveMongoOperations;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.LookupOperation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.aggregation.TypedAggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Created on: 3/15/20
 *
 * @author Denis Citaku
 **/
@Service
public class ProductService extends BasicServiceOperation<Product, ProductPayload, ProductRepository> {

    protected ProductService(ProductMapper productMapper, ProductRepository repository, ReactiveMongoOperations mongoOperations) {
        super(productMapper, repository, mongoOperations);
    }

    public Flux<ProductPayload> findAllByCodeOrName(String codeOrName) {
        return repository.findAllByCodeContainingIgnoreCaseOrNameContainingIgnoreCase(codeOrName, codeOrName)
                .map(mapper::entityToPayload);
    }

    public Mono<ProductPayload> findByCode(String code) {
        return repository.findByCode(code)
                .map(mapper::entityToPayload);
    }

    public Flux<ProductPayload> findAllLowInStock(String locationId) {
        LookupOperation lookupOperation = LookupOperation.newLookup()
                .from("stock")
                .localField("id")
                .foreignField("stockId.productId")
                .as("stock");
        MatchOperation matchOperation = Aggregation.match(Criteria.where("stock.stockId.locationId")
                .is(locationId)
                .and("stock.units")
                .lte("minStock"));
        TypedAggregation<Product> productTypedAggregation = Aggregation.newAggregation(Product.class, lookupOperation);
        return reactiveOps.aggregate(productTypedAggregation, Product.class).map(mapper::entityToPayload);
    }

    @Override
    protected Mono<ProductPayload> doDatabaseValidationOn(ProductPayload payload, CrudOperation crudOperation) {
        if (crudOperation == CrudOperation.CREATE) {
            return existsByCode(payload.getCode())
                    .handle((exists, sink) -> {
                        if (exists) {
                            sink.error(ValidationExceptionPayload.builder()
                                    .fieldName("code")
                                    .message("must not be duplicate")
                                    .rejectedValue(payload.getCode())
                                    .code("code.duplicate")
                                    .build()
                                    .toEntityValidationException());
                        } else {
                            sink.next(payload);
                        }
                    });
        }

        return Mono.just(payload);
    }

    private Mono<Boolean> existsByCode(String code) {
        return reactiveOps.exists(Query.query(Criteria.where("code").is(code)), Product.class);
    }

}
