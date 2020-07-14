package com.backend.lucrarelicenta.controller;


import com.backend.lucrarelicenta.exceptions.JobPostNotFoundException;
import com.backend.lucrarelicenta.model.JobPost;
import com.backend.lucrarelicenta.model.User;
import com.backend.lucrarelicenta.repository.UserRepository;
import com.backend.lucrarelicenta.service.JobPostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/jobposts")
@CrossOrigin(origins = "http://localhost:3000")
public class JobPostController {
    private JobPostService jobPostService;
    private final UserRepository userRepository;

    public JobPostController(JobPostService jobPostService, UserRepository userRepository) {
        this.jobPostService = jobPostService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<JobPost>> findAllJobPosts(){
        List<JobPost> jobPostList = jobPostService.findAllJobPosts();
        return ResponseEntity.ok(jobPostList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<JobPost>> findJobPostById(@PathVariable Long id){
        Optional<JobPost> jobPost = jobPostService.findJobPostById(id);
        if(!jobPost.isPresent()){
            throw new JobPostNotFoundException("Job Post with id: " + id + " not found");
        }

        return ResponseEntity.ok(jobPost);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Optional<JobPost>> deleteJobPost(@PathVariable Long id){
        Optional<JobPost> jobPost = jobPostService.findJobPostById(id);
        if(!jobPost.isPresent()){
            throw new JobPostNotFoundException("Job Post with id: " + " not found");
        }

        jobPostService.deleteJobPost(id);

        return ResponseEntity.ok(jobPost);
    }

    @PostMapping
    public ResponseEntity<JobPost> addJobPost(@RequestBody JobPost jobPost ) {
        JobPost newJobPost = jobPostService.addJobPost(jobPost);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(newJobPost.getId()).toUri();

        return ResponseEntity.created(location).build();
    }

    @PutMapping("/{id}/addUser/{userEmail}")
    public ResponseEntity<String> addUserToJobPost(@PathVariable Long id, @PathVariable String userEmail) {

        Optional <JobPost> jobPost = jobPostService.findJobPostById(id);
        if (!jobPost.isPresent()) {
            throw new JobPostNotFoundException("Job Post with id: " + " not found");
        }
        Optional<User> foundUser = userRepository.findByEmail(userEmail);

        if (jobPost.get().getUsers().contains(foundUser.get())) {
            return ResponseEntity.ok().body("User has applied already");
        }

        List<User> users = jobPost.get().getUsers();
        users.add(foundUser.get());

        jobPostService.addJobPost(jobPost.get());

        return ResponseEntity.ok().body("User has been added to jobPost!");
    }
}

