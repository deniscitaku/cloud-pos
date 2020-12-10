package com.denlir.pos.entity;

import com.denlir.pos.util.EntityToPayloadTester;
import com.denlir.pos.entity.inventory.Product;
import com.denlir.pos.payload.inventory.ProductPayload;

import java.util.function.Supplier;

public class ProductTest implements EntityToPayloadTester<Product, ProductPayload> {

    @Override
    public Supplier<ProductPayload> payload() {
        return ProductPayload::new;
    }

    @Override
    public Supplier<Product> entity() {
        return Product::new;
    }

}
