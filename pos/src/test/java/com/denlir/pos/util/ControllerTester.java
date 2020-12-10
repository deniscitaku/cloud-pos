package com.denlir.pos.util;

import com.denlir.pos.payload.BasePayload;
import com.denlir.pos.payload.domain.PagePayload;
import com.denlir.pos.service.BasicServiceOperation;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Iterables;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.util.LinkedMultiValueMap;

import java.util.*;
import java.util.function.BiFunction;
import java.util.function.Supplier;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@AutoConfigureMockMvc
@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_CLASS)
@ActiveProfiles("test")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public abstract class ControllerTester<P extends BasePayload> {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  public abstract Supplier<P> payload();

  public abstract BiFunction<P, Integer, P> updateFunction();

  public abstract String basePath();

  public abstract BasicServiceOperation<?, P, ?> service();

  public Collection<P> invalidPayloadsForCreate() {
    return Collections.emptyList();
  }

  public Collection<P> invalidPayloadsForUpdate(Collection<P> createdPayloads) {
    return Collections.emptyList();
  }

  public Stream<Supplier<?>> expectNullFieldsWhenRead(P payload) {
    return Stream.empty();
  }

  @Order(2)
  @Test
  public void createAll() throws Exception {
    Supplier<P> supplier = payload();
    List<P> payloads = IntStream.iterate(0, x -> x < 10, x -> x + 1)
        .mapToObj(x -> updateFunction().apply(supplier.get(), x))
        .collect(Collectors.toList());

    mockMvc.perform(post(formatURI("/all"))
        .contentType(APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(payloads)))
        .andDo(print())
        .andExpect(status().isOk());
  }

  @Order(3)
  @Test
  public void findAll() throws Exception {
    Collection<P> all = service().findAll();

    mockMvc.perform(get(formatURI("/all")))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().json(objectMapper.writeValueAsString(all)));
  }

  @Order(4)
  @Test
  public void findAllPaged() throws Exception {
    objectMapper.enableDefaultTyping();
    String content = mockMvc.perform(get(formatURI("/paged"))
        .queryParams(new LinkedMultiValueMap<>(Map.of(
            "page", List.of("1"),
            "size", List.of("5"),
            "direction", List.of("DESC"),
            "sortBy", List.of("id")))))
        .andDo(print())
        .andExpect(status().isOk())
        .andReturn()
        .getResponse()
        .getContentAsString();

    PagePayload<P> pagePayload = objectMapper.readValue(content, new TypeReference<>() {});

    assertNotNull(pagePayload);
    assertEquals(1, pagePayload.getPage());
    assertEquals(5, pagePayload.getPageSize());
    assertEquals(2, pagePayload.getTotalPages());
    assertEquals(10, pagePayload.getTotalCount());

    assertNotNull(pagePayload.getData());
    assertEquals(5, pagePayload.getData().size());

    List<Long> ids = pagePayload.getData()
        .stream()
        .map(BasePayload::getId)
        .collect(Collectors.toList());

    List<Long> sortedIds = service().findAll().stream()
        .limit(5)
        .sorted(Comparator.comparingLong(BasePayload::getId).reversed())
        .map(BasePayload::getId)
        .collect(Collectors.toList());

    assertTrue(Iterables.elementsEqual(ids, sortedIds));
  }

  @Order(5)
  @Test
  public void findAllSorted() throws Exception {
    objectMapper.disableDefaultTyping();
    String content = mockMvc.perform(get(formatURI("/sorted"))
        .queryParams(new LinkedMultiValueMap<>(Map.of(
            "direction", List.of("DESC"),
            "sortBy", List.of("id")))))
        .andDo(print())
        .andExpect(status().isOk())
        .andReturn()
        .getResponse()
        .getContentAsString();

    List<LinkedHashMap<String, Object>> sortedPayload = objectMapper.readValue(content, new TypeReference<>() {});

    List<Long> ids = sortedPayload.stream()
        .map(x -> (long) (int) x.get("id"))
        .collect(Collectors.toList());

    List<Long> sortedIds = service().findAll().stream()
        .sorted(Comparator.comparingLong(BasePayload::getId).reversed())
        .map(BasePayload::getId)
        .collect(Collectors.toList());

    assertNotNull(sortedPayload);
    assertTrue(Iterables.elementsEqual(ids, sortedIds));
  }

  @Order(6)
  @Test
  public void create() throws Exception {
    P payload = payload().get();

    byte[] content = mockMvc.perform(post(formatURI(""))
        .contentType(APPLICATION_JSON)
        .content(objectMapper.writeValueAsBytes(payload)))
        .andDo(print())
        .andExpect(status().isOk())
        .andReturn()
        .getResponse()
        .getContentAsByteArray();

    P createdPayload = (P) objectMapper.readValue(content, payload.getClass());
    assertNotNull(createdPayload.getId());
  }

  @Order(7)
  @Test
  public void findById() throws Exception {
    P payload = service().findAll().stream().findFirst().orElseThrow();

    mockMvc.perform(get(formatURI("{id}"), payload.getId()))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().json(objectMapper.writeValueAsString(payload)));

    expectNullFieldsWhenRead(payload)
        .forEach(x -> assertTrue(x.get() == null || ((Collection<?>) x.get()).isEmpty()));
  }

  @Order(8)
  @Test
  public void findById_NotFound() throws Exception {
    mockMvc.perform(get(formatURI("{id}"), 100L))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().string("null"));
  }

  @Order(9)
  @Test
  public void update() throws Exception {
    P payload = updateFunction().apply(new ArrayList<>(service().findAll("all")).get(0), 1);

    mockMvc.perform(put(formatURI(""))
        .contentType(APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(payload)))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().json(objectMapper.writeValueAsString(payload)));
  }

  @Order(10)
  @Test
  public void updateAll() throws Exception {
    List<P> all = new ArrayList<>(service().findAll("all"));
    List<P> payloads = IntStream.iterate(0, x -> x < all.size(), x -> x + 1)
        .mapToObj(x -> updateFunction().apply(all.get(x), x * 10))
        .collect(Collectors.toList());

    mockMvc.perform(put(formatURI("/all"))
        .contentType(APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(payloads)))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().json(objectMapper.writeValueAsString(payloads)));
  }

  @Order(11)
  @Test
  public void deleteById() {
    service().findAll().stream().findFirst().ifPresent(entity -> {
      try {
        mockMvc.perform(delete(formatURI("/{id}"), entity.getId()))
            .andDo(print())
            .andExpect(status().isOk())
            .andExpect(content().string(""));
      } catch (Exception e) {
        e.printStackTrace();
      }
    });

  }

  @Order(12)
  @Test
  public void validationForUpdate() {
    Collection<P> all = service().findAll();

    invalidPayloadsForUpdate(all).forEach(x -> {
      try {
        mockMvc.perform(put(formatURI(""))
            .contentType(APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(x)))
            .andDo(print())
            .andExpect(status().isBadRequest());
      } catch (Exception e) {
        e.printStackTrace();
      }
    });
  }

  @Order(13)
  @Test
  public void validationForCreate() {
    invalidPayloadsForCreate().forEach(x -> {
      try {
        mockMvc.perform(post(formatURI(""))
            .contentType(APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(x)))
            .andDo(print())
            .andExpect(status().isBadRequest());
      } catch (Exception e) {
        e.printStackTrace();
      }
    });
  }

  @Order(Integer.MAX_VALUE)
  @Test
  public void deleteAllByList() throws Exception {
    List<P> all = new ArrayList<>(service().findAll());

    mockMvc.perform(delete(formatURI(""))
        .contentType(APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(all)))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().string(""));

    List<P> contentAfterDelete = new ArrayList<>(service().findAll());

    assertTrue(contentAfterDelete.isEmpty());
  }

  private String formatURI(String value) {
    return String.format("/%s/%s", basePath(), value);
  }

}

