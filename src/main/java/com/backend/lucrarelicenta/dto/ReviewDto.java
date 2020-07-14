package com.backend.lucrarelicenta.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class ReviewDto {

     private Long id;
     @NotNull
     private String communicationSkills;
     @NotNull
     private String bodyLanguage;
     @NotNull
     private String opinion;
     @NotNull
     private Long interviewId;
     @NotNull
     private String userEmail;
}
