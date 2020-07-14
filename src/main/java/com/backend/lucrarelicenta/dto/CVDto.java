package com.backend.lucrarelicenta.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CVDto {
    private String userEmail;
    private String description;
    private String skills;
    private String education;

}
