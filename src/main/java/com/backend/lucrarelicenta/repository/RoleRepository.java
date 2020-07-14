package com.backend.lucrarelicenta.repository;

import com.backend.lucrarelicenta.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role,Long> {
    public Optional<Role> findByTitle(String title);
//
//    @Query("DELETE FROM USERS_ROLE_LIST WHERE ROLE_LIST_ID = ?1; ")
//    public void deleteUsersRoleById(Long id);
}
