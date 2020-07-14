package com.backend.lucrarelicenta.service;

import com.backend.lucrarelicenta.model.Review;
import com.backend.lucrarelicenta.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {
    private ReviewRepository reviewRepository;

    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public List<Review> findReviewByUser(Long id){
        return reviewRepository.findByInterviewUserId(id);
    }

    public Optional<Review> findReviewById(Long id){
        return reviewRepository.findById(id);
    }

    public List<Review> findAllReviews(){
        return reviewRepository.findAll();
    }

    public Review addReview(Review review){
        return reviewRepository.save(review);
    }

    public void deleteReview(Long id){
        reviewRepository.deleteById(id);
    }

}

