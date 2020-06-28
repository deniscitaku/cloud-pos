package com.denlir.pos.filter;

import lombok.NonNull;

/**
 * Created on: 3/10/20
 *
 * @author Denis Citaku
 **/
public class UserContextHolder {

  private static final ThreadLocal<UserContext> userContext = new ThreadLocal<>();

  public static UserContext getContext(){
    if (userContext.get() == null) {
      userContext.set(createEmptyContext());
    }

    return userContext.get();
  }

  public static void setContext(@NonNull UserContext context) {
    userContext.set(context);
  }

  public static UserContext createEmptyContext(){
    return new UserContext();
  }

}
