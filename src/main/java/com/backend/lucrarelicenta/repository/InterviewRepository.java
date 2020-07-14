package com.backend.lucrarelicenta.repository;

import com.backend.lucrarelicenta.model.Interview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterviewRepository extends JpaRepository<Interview, Long> {
    List<Interview> findByJobId(Long id);
}
