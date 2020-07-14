package com.backend.lucrarelicenta.repository;

import com.backend.lucrarelicenta.model.CV;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CVRepository extends JpaRepository <CV,Long> {
    Optional<CV> findByUserEmail(String email);
}
