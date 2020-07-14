package com.backend.lucrarelicenta.repository;

import com.backend.lucrarelicenta.model.Experience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExperienceRepository extends JpaRepository <Experience,Long> {
     public List<Experience> findByCvId(Long id);
}


