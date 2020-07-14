package com.backend.lucrarelicenta.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class BasicAuthenticationController {

    @GetMapping(path = "/basicauth")
    public ResponseEntity<String> authenticate() {
        return ResponseEntity.ok("Success");
    }
}