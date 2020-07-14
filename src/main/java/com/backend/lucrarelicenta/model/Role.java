package com.backend.lucrarelicenta.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity(name ="ROLES")

public class Role {
    @Id
    @GeneratedValue
    private Long id;
    @NotNull
    private String title;
//    @ManyToMany(mappedBy = "roleList")
////    @JsonIgnoreProperties("roleList")
//    @JsonIgnore
//    private List<User> users;


    @JsonIgnore
    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL)
    private List<Employee> employeeList;
}
