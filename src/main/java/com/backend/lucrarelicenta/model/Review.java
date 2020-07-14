package com.backend.lucrarelicenta.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity(name = "REVIEWS")
public class Review {
    @Id
    @GeneratedValue
    private Long id;
    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnore
    private User hrUser;
//    @NotNull
    @ManyToOne
//    @JsonIgnoreProperties(value = {"review", "user","job"})
    @JsonIgnore
    private Interview interview;
    @NotNull
    private String communicationSkills;
    @NotNull
    private String bodyLanguage;
    @NotNull
    private String opinion;

}
