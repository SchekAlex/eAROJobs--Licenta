package com.backend.lucrarelicenta.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class InterviewNotFoundException extends RuntimeException {
    public InterviewNotFoundException (String message){
        super(message);
    }
}
