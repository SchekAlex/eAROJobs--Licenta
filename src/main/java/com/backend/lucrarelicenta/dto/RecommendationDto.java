package com.backend.lucrarelicenta.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RecommendationDto {
    @NotNull
    private String employeeMail;
    @NotNull
    private Long userId;
    @NotNull
    private Long interviewId;
}
