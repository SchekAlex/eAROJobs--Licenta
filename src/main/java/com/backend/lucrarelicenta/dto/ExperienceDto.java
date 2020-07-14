package com.backend.lucrarelicenta.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ExperienceDto {
    @NotNull
    private Long cvId;
    @NotNull
    private Long experienceId;
    @NotNull
    private String companyName;
    @NotNull
    private String jobTitle;
    @NotNull
    private String employmentDuration;
    @NotNull
    private String jobDescription;
}
