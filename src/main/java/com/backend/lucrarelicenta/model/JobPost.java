package com.backend.lucrarelicenta.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity(name = "JOBPOSTS")

public class JobPost {
    @Id
    @GeneratedValue
    private Long id;
    @NotNull
    private String title;
    @NotNull
    private Long revenue;
    @NotNull
    private String education;
    @NotNull
    private String experience;
    @NotNull
    private  String description;
    @NotNull
    private String jobType;
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "user_jobpost",
            joinColumns = @JoinColumn(name = "jobpost_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> users;
    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Interview> interviewList;

}
