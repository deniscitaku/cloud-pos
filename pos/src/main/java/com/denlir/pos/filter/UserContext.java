package com.denlir.pos.filter;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

/**
 * Created on: 3/10/20
 *
 * @author Denis Citaku
 **/
@Getter
@Setter
@Component
public class UserContext {

  public static final String AUTH_TOKEN = "auth-token";
  public static final String USER_ID = "user-id";
  public static final String TENANT_ID = "tenant-id";

  private String authToken = "";
  private String userId = "";
  private String orgId = "";

}
