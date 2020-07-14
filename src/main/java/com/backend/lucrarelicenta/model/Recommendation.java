package com.backend.lucrarelicenta.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity(name ="RECOMMENDATIONS")
public class Recommendation {
    @Id
    @GeneratedValue
    private Long Id;
    @NotNull
    @ManyToOne
    @JsonIgnoreProperties(value = {"recommendation"})
    private User employee;
    @ManyToOne
    private User users;
    @ManyToOne
    @JsonIgnoreProperties(value = {"user","recommendation","job"})
    private Interview interview;
}
