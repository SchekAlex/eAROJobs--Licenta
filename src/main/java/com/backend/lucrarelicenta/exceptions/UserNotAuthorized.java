package com.backend.lucrarelicenta.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class UserNotAuthorized extends RuntimeException {
     public UserNotAuthorized(String message){
         super(message);
     }
}
