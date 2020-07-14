package com.backend.lucrarelicenta.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity(name = "EMPLOYEES")
public class Employee {
    @Id
    @GeneratedValue
    private Long id;
    @NotNull
    private String firstName;
    @NotNull
    private String lastName;
    @NotNull
    private String jobTitle;
    @NotNull
    @ManyToOne
    private Role role;
    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
    private List<Recommendation> recommendation;


}
