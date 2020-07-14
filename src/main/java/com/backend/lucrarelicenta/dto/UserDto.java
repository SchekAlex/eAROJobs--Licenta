package com.backend.lucrarelicenta.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class UserDto {
      private Long id;

      private String firstName;

      private String lastName;

      private String email;

      private String password;

      private LocalDateTime birthDate;
}
