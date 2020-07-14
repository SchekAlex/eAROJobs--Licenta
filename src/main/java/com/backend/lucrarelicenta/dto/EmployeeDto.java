package com.backend.lucrarelicenta.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EmployeeDto {
    @NotNull
    private String firstName;
    @NotNull
    private String lastName;
    @NotNull
    private String jobTitle;
    @NotNull
    private String role;
}
