package com.denlir.pos.payload.domain;

import lombok.Data;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;

import java.util.List;

@Data
public class PagePayload<P> {

  private List<P> data;

  private int page;

  private int pageSize;

  private int totalPages;

  private long totalCount;

  private String sortDirection;

  private String[] sortedBy;

  public static <T> PagePayload<T> fromPageable(Page<T> page) {
    PagePayload<T> pagePayload = new PagePayload<>();
    pagePayload.data = page.getContent();
    pagePayload.page = page.getNumber();
    pagePayload.pageSize = page.getSize();
    pagePayload.totalPages = page.getTotalPages();
    pagePayload.totalCount = page.getTotalElements();
    pagePayload.sortDirection = page.getSort().toString();
    pagePayload.sortedBy = page.getSort()
        .get()
        .map(Sort.Order::getProperty)
        .toArray(String[]::new);

    return pagePayload;
  }
}
