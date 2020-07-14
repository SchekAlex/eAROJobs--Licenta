package com.backend.lucrarelicenta.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity(name ="INTERVIEWS")

public class Interview {
   @Id
   @GeneratedValue
   private Long id;
   @OneToMany(mappedBy = "interview",cascade = CascadeType.ALL)
   @JsonIgnore
   private List<Review> reviews;
   @NotNull
   @ManyToOne
   private User user;
   @NotNull
   @ManyToOne
   @JsonIgnoreProperties(value = {"users"})
   private JobPost job;
   @OneToMany(mappedBy = "interview", cascade = CascadeType.ALL)
   private List<Recommendation> recommendation;



}
