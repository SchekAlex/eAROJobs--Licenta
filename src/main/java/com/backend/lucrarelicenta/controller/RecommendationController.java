package com.backend.lucrarelicenta.controller;

import com.backend.lucrarelicenta.dto.RecommendationDto;
import com.backend.lucrarelicenta.exceptions.RecommendationNotFoundException;
import com.backend.lucrarelicenta.model.Employee;
import com.backend.lucrarelicenta.model.Interview;
import com.backend.lucrarelicenta.model.Recommendation;
import com.backend.lucrarelicenta.model.User;
import com.backend.lucrarelicenta.repository.UserRepository;
import com.backend.lucrarelicenta.service.EmployeeService;
import com.backend.lucrarelicenta.service.InterviewService;
import com.backend.lucrarelicenta.service.RecommendationService;
import com.backend.lucrarelicenta.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/recommendations")
@CrossOrigin(origins = "http://localhost:3000")
public class RecommendationController {
    private RecommendationService recommendationService;
    private UserService userService;
    private EmployeeService employeeService;
    private InterviewService interviewService;
    private final UserRepository userRepository;

    public RecommendationController(RecommendationService recommendationService, UserService userService, EmployeeService employeeService, InterviewService interviewService, UserRepository userRepository) {
        this.recommendationService = recommendationService;
        this.userService= userService;
        this.employeeService = employeeService;
        this.interviewService = interviewService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<Recommendation>> findAllRecommendation(){
        List<Recommendation> recommendationList = recommendationService.findAllRecommendation();
        return ResponseEntity.ok(recommendationList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Recommendation>> findRecommendationById(@PathVariable Long id){
        Optional<Recommendation> recommendation = recommendationService.findRecommendationById(id);
        if(!recommendation.isPresent()){
            throw new RecommendationNotFoundException("Recommendation with id: " + id + " not found");
        }
        return ResponseEntity.ok(recommendation);
    }

    @PostMapping
    public ResponseEntity<Recommendation> addRecommendation(@RequestBody RecommendationDto recommendationDto){
        Recommendation recommendation = new Recommendation();

        Optional<User> employee = userRepository.findByEmail(recommendationDto.getEmployeeMail());
        recommendation.setEmployee(employee.get());

        Optional<User> user = userService.findUserById(recommendationDto.getUserId());
        recommendation.setUsers(user.get());

        Optional<Interview> interview = interviewService.findById(recommendationDto.getInterviewId());
        recommendation.setInterview(interview.get());

        Recommendation savedRecommendation = recommendationService.addRecommendation(recommendation);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedRecommendation.getId()).toUri();

        return ResponseEntity.created(location).build();


    }

      @DeleteMapping("/{id}")
      public ResponseEntity<Optional<Recommendation>> deleteRecommendation (@PathVariable Long id){
         Optional<Recommendation> recommendation = recommendationService.findRecommendationById(id);

         if(!recommendation.isPresent()){
             throw new RecommendationNotFoundException("Recommendation with id: " + id + " not found");
         }

         recommendationService.deleteRecommendation(id);

         return ResponseEntity.ok(recommendation);
      }
}
