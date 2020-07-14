package com.backend.lucrarelicenta.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity(name = "EXPERIENCES")

public class Experience {
    @Id
    @GeneratedValue
    private Long id;
    @NotNull
    private String companyName;
    @NotNull
    private String jobTitle;
    @NotNull
    private String employmentDuration;
    @NotNull
    private String description;
    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnore
    @NotNull
    private CV cv;


}
