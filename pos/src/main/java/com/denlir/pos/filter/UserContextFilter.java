package com.denlir.pos.filter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

/**
 * Created on: 3/10/20
 *
 * @author Denis Citaku
 **/
@Component
@Slf4j
public class UserContextFilter {/*implements WebFilter {

  @Override
  public Mono<Void> filter(ServerWebExchange serverWebExchange, WebFilterChain webFilterChain) {
    HttpHeaders requestHeaders = serverWebExchange.getRequest().getHeaders();
    getHeadersFromRequest(requestHeaders);

    HttpHeaders responseHeaders = serverWebExchange.getResponse().getHeaders();
    addHeadersToResponse(responseHeaders);
    return webFilterChain.filter(serverWebExchange);
  }

  private void addHeadersToResponse(HttpHeaders responseHeaders) {
    log.debug("<-- Adding headers to response: {}", responseHeaders);
    responseHeaders.add(UserContext.AUTH_TOKEN, UserContextHolder.getContext().getAuthToken());
  }

  private void getHeadersFromRequest(HttpHeaders requestHeaders) {
    log.debug("--> Getting headers from request: {}", requestHeaders);
    UserContextHolder.getContext().setUserId(requestHeaders.getFirst(UserContext.USER_ID));
    UserContextHolder.getContext().setAuthToken(requestHeaders.getFirst(UserContext.AUTH_TOKEN));
    UserContextHolder.getContext().setOrgId(requestHeaders.getFirst(UserContext.TENANT_ID));
  }*/
}
