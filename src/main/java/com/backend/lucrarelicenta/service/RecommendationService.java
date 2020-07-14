package com.backend.lucrarelicenta.service;

import com.backend.lucrarelicenta.model.Recommendation;
import com.backend.lucrarelicenta.repository.RecommendationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecommendationService {
    private RecommendationRepository recommendationRepository;

    public RecommendationService(RecommendationRepository recommendationRepository) {
        this.recommendationRepository = recommendationRepository;
    }

    public List<Recommendation> findAllRecommendation(){
        return recommendationRepository.findAll();
    }
    public Optional<Recommendation> findRecommendationById(Long id){
        return recommendationRepository.findById(id);
    }

    public Recommendation addRecommendation(Recommendation recommendation){
        return recommendationRepository.save(recommendation);
    }

    public void deleteRecommendation(Long id){
        recommendationRepository.deleteById(id);
    }
}
