package com.backend.lucrarelicenta.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity(name = "CVS")
public class CV {
    @Id
    @GeneratedValue
    private Long id;
//    @NotNull
    @JsonIgnoreProperties(value = {"cv"})
    @OneToMany(mappedBy = "cv", cascade = CascadeType.ALL)
    private List<Experience> experience;
    @NotNull
    private String education;
    @NotNull
    private String skills;
    @NotNull
    private String description;
    @OneToOne
    @JsonIgnoreProperties(value = {"cv"})
    private User user;


}
