package com.denlir.pos.config;

import com.mongodb.MongoClientOptions;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.event.EventListener;
import org.springframework.data.mongodb.ReactiveMongoDatabaseFactory;
import org.springframework.data.mongodb.ReactiveMongoTransactionManager;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.convert.MongoConverter;
import org.springframework.data.mongodb.core.index.MongoPersistentEntityIndexResolver;
import org.springframework.data.mongodb.core.mapping.BasicMongoPersistentEntity;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;

@Slf4j
@RequiredArgsConstructor
@Configuration
@EnableMongoAuditing
public class MongoConfig {

  private final ReactiveMongoTemplate reactiveMongoTemplate;

  private final MongoConverter mongoConverter;

  @EventListener(ApplicationReadyEvent.class)
  public void initIndicesAfterStartup() {

    log.info("--> Mongo InitIndicesAfterStartup init");
    var init = System.currentTimeMillis();

    var mappingContext = this.mongoConverter.getMappingContext();

    if (mappingContext instanceof MongoMappingContext) {
      MongoMappingContext mongoMappingContext = (MongoMappingContext) mappingContext;
      for (BasicMongoPersistentEntity<?> persistentEntity : mongoMappingContext.getPersistentEntities()) {
        var clazz = persistentEntity.getType();
        if (clazz.isAnnotationPresent(Document.class)) {
          var resolver = new MongoPersistentEntityIndexResolver(mongoMappingContext);

          var indexOps = reactiveMongoTemplate.indexOps(clazz);
          resolver.resolveIndexFor(clazz).forEach(indexOps::ensureIndex);

          String collectionName = reactiveMongoTemplate.getCollectionName(clazz);
          reactiveMongoTemplate.getCollectionNames()
              .filter(x -> !x.contains(collectionName))
              .map(reactiveMongoTemplate::createCollection)
              .subscribe();
        }
      }
    }
    log.info("--> Mongo InitIndicesAfterStartup take: {}", (System.currentTimeMillis() - init));
  }

  @Bean
  public ReactiveMongoTransactionManager transactionManager(ReactiveMongoDatabaseFactory reactiveMongoDatabaseFactory) {
    return new ReactiveMongoTransactionManager(reactiveMongoDatabaseFactory);
  }

}
