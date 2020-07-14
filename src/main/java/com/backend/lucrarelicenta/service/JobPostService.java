package com.backend.lucrarelicenta.service;

import com.backend.lucrarelicenta.model.JobPost;
import com.backend.lucrarelicenta.repository.JobPostRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobPostService {
    private JobPostRepository jobPostRepository;

    public JobPostService(JobPostRepository jobPostRepository) {
        this.jobPostRepository = jobPostRepository;
    }
    public Optional<JobPost> findJobPostById(Long id){
        return jobPostRepository.findById(id);
    }

    public List<JobPost> findAllJobPosts(){
        return jobPostRepository.findAll();
    }

    public JobPost addJobPost(JobPost jobPost){
        return jobPostRepository.save(jobPost);
    }

    public void deleteJobPost(Long id){
        jobPostRepository.deleteById(id);
    }
}
