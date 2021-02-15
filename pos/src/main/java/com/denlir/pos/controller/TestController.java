package com.denlir.pos.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.atomic.AtomicInteger;

@RestController
@RequestMapping("/iterable")
public class TestController {

  private static AtomicInteger count = new AtomicInteger(1);

  @PostMapping
  public ResponseEntity<String> request(@RequestBody String body) {
    if (count.incrementAndGet() % 1000 == 0) {
      return ResponseEntity.status(504).body(body);
    }

    return ResponseEntity.ok(body);
  }

}
