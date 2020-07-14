package com.backend.lucrarelicenta.controller;

import com.backend.lucrarelicenta.dto.ReviewDto;
import com.backend.lucrarelicenta.exceptions.ReviewNotFoundException;
import com.backend.lucrarelicenta.model.Interview;
import com.backend.lucrarelicenta.model.Review;
import com.backend.lucrarelicenta.model.User;
import com.backend.lucrarelicenta.repository.UserRepository;
import com.backend.lucrarelicenta.service.InterviewService;
import com.backend.lucrarelicenta.service.ReviewService;
import com.backend.lucrarelicenta.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/reviews")
public class ReviewController {
    private ReviewService reviewService;
    private InterviewService interviewService;
    private UserService userService;
    private final UserRepository userRepository;

    public ReviewController(ReviewService reviewService, InterviewService interviewService, UserService userService, UserRepository userRepository) {
        this.reviewService = reviewService;
        this.interviewService = interviewService;
        this.userService= userService;
        this.userRepository = userRepository;
    }
    @GetMapping
    public ResponseEntity<List<Review>> findAllReviews(){
      List<Review> reviewList = reviewService.findAllReviews();
      return ResponseEntity.ok(reviewList);
    }
    @PostMapping
    public ResponseEntity<Review> addReview(@RequestBody ReviewDto reviewDto){
        Review review = new Review();

        Optional<Interview> interview = interviewService.findById(reviewDto.getInterviewId());

        review.setInterview(interview.get());

        Optional<User> user = userRepository.findByEmail(reviewDto.getUserEmail());

        review.setHrUser(user.get());

        review.setCommunicationSkills(reviewDto.getCommunicationSkills());
        review.setBodyLanguage(reviewDto.getBodyLanguage());
        review.setOpinion(reviewDto.getOpinion());

        Review savedReview = reviewService.addReview(review);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedReview.getId()).toUri();

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Review>> findReviewById(@PathVariable Long id){
        Optional<Review> review = reviewService.findReviewById(id);

        if(!review.isPresent()){
            throw new ReviewNotFoundException("Review with id: "+ id + " not found");
        }

        return ResponseEntity.ok(review);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Optional<Review>> updateReview(@PathVariable Long id, @RequestBody ReviewDto reviewDto) {

        Optional<Review> foundReview = reviewService.findReviewById(id);

        if (!foundReview.isPresent()) {
            throw new ReviewNotFoundException("Review with id " + id + " not found");
        }

        if (!reviewDto.getCommunicationSkills().isEmpty()) {
            foundReview.get().setCommunicationSkills(reviewDto.getCommunicationSkills());
        }
        if (!reviewDto.getBodyLanguage().isEmpty()) {
            foundReview.get().setBodyLanguage(reviewDto.getBodyLanguage());
        }
        if (!reviewDto.getOpinion().isEmpty()) {
            foundReview.get().setOpinion(reviewDto.getOpinion());
        }

        reviewService.addReview(foundReview.get());

        return ResponseEntity.ok().build();
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<List<Review>> findByUserId(@PathVariable Long id){
        List<Review> review = reviewService.findReviewByUser(id);

        return ResponseEntity.ok(review);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Optional<Review>> deleteReview(@PathVariable Long id){
        Optional<Review> review = reviewService.findReviewById(id);
        if(!review.isPresent()){
            throw new ReviewNotFoundException("Review with id: "+ id + " not found");
        }

        reviewService.deleteReview(id);


        return ResponseEntity.ok(review);

    }


}
