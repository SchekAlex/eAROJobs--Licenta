package com.backend.lucrarelicenta.repository;

import com.backend.lucrarelicenta.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review,Long> {
    public List<Review> findByInterviewUserId(Long id);
}
