package com.denlir.pos.entity;

import com.denlir.pos.util.EntityToPayloadTester;
import com.denlir.pos.entity.inventory.Category;
import com.denlir.pos.payload.inventory.CategoryPayload;

import java.util.function.Supplier;

public class CategoryTest implements EntityToPayloadTester<Category, CategoryPayload> {

    @Override
    public Supplier<CategoryPayload> payload() {
        return CategoryPayload::new;
    }

    @Override
    public Supplier<Category> entity() {
        return Category::new;
    }

}
