package com.backend.lucrarelicenta.controller;

import com.backend.lucrarelicenta.dto.InterviewDto;
import com.backend.lucrarelicenta.exceptions.InterviewNotFoundException;
import com.backend.lucrarelicenta.model.Interview;
import com.backend.lucrarelicenta.model.JobPost;
import com.backend.lucrarelicenta.model.User;
import com.backend.lucrarelicenta.repository.InterviewRepository;
import com.backend.lucrarelicenta.service.InterviewService;
import com.backend.lucrarelicenta.service.JobPostService;
import com.backend.lucrarelicenta.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/interviews")
@CrossOrigin(origins = "http://localhost:3000")
public class InterviewController {
    private InterviewService interviewService;
    private UserService userService;
    private JobPostService jobPostService;
    private final InterviewRepository interviewRepository;

    public InterviewController(InterviewService interviewService, UserService userService, JobPostService jobPostService, InterviewRepository interviewRepository) {
        this.interviewService = interviewService;
        this.userService = userService;
        this.jobPostService = jobPostService;
        this.interviewRepository = interviewRepository;
    }

    @GetMapping
    public ResponseEntity<List<Interview>> findAllInterviews(){
        List<Interview> interviewList = interviewService.findAll();
        return ResponseEntity.ok(interviewList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Interview>> findInterviewById(@PathVariable Long id){
        Optional<Interview> interview = interviewService.findById(id);
        if(!interview.isPresent()){
            throw new InterviewNotFoundException("Interview with id: " + id + " not found");
        }

        return ResponseEntity.ok(interview);
    }

    @PostMapping
    public ResponseEntity<Interview> addInterview(@RequestBody InterviewDto interviewDto){
        Interview newInterview = new Interview();

        Optional<User> user= userService.findUserById(interviewDto.getUserId());

        Optional<JobPost> jobPost = jobPostService.findJobPostById(interviewDto.getJobId());

        newInterview.setUser(user.get());
        newInterview.setJob(jobPost.get());

        Interview savedInterview = interviewService.addInterview(newInterview);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedInterview.getId()).toUri();

        return ResponseEntity.created(location).build();

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Optional<Interview>> deleteInterview(@PathVariable Long id){
        Optional<Interview> interview = interviewService.findById(id);
        if(!interview.isPresent()){
            throw new InterviewNotFoundException("Interview with id: " + id + " not found");
        }

        interviewService.deleteInterview(id);

        return ResponseEntity.ok(interview);
    }

    @GetMapping("/job-post/{jobId}")
    public ResponseEntity<List<Interview>> getAllInterviewsByJobId(@PathVariable Long jobId) {
        List<Interview> interviews = interviewRepository.findByJobId(jobId);

        return ResponseEntity.ok().body(interviews);
    }
}
