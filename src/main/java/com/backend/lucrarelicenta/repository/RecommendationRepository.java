package com.backend.lucrarelicenta.repository;

import com.backend.lucrarelicenta.model.Recommendation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecommendationRepository extends JpaRepository<Recommendation,Long> {

}
