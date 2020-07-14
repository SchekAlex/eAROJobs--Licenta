package com.backend.lucrarelicenta.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

@Entity(name = "USERS")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue
    private Long id;
    @NotNull
    private String firstName;
    @NotNull
    private String lastName;
    @NotNull
    @Email
    private String email;
    @NotNull
    @Size
    private String password;
    @NotNull
    private LocalDateTime birthDate;
    @NotNull
    @ManyToMany(fetch = FetchType.EAGER)
//    @JoinTable(
//            name = "user_role",
//            joinColumns = @JoinColumn(name ="user_id"),
//            inverseJoinColumns = @JoinColumn(name ="role_id")
//    )
//    @JsonIgnoreProperties
    private List<Role> roleList;
    @OneToMany(mappedBy = "hrUser", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Review> reviews;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Interview> interviews;
    @ManyToMany(mappedBy = "users")
    @JsonIgnore
    private List<JobPost> jobPost;
    @OneToMany(mappedBy = "users")
    @JsonIgnore
    private List<Recommendation> recommendation;
    @OneToOne(mappedBy = "user")
    @JsonIgnoreProperties("user")
    private CV cv;
}
