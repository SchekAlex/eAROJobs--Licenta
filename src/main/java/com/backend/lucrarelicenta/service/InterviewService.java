package com.backend.lucrarelicenta.service;

import com.backend.lucrarelicenta.model.Interview;
import com.backend.lucrarelicenta.repository.InterviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InterviewService {
    private InterviewRepository interviewRepository;

    public InterviewService(InterviewRepository interviewRepository) {
        this.interviewRepository = interviewRepository;
    }

    public Optional<Interview> findById(Long id){
        return interviewRepository.findById(id);
    }

    public List<Interview> findAll(){
        return interviewRepository.findAll();
    }

    public Interview addInterview(Interview interview){
         return interviewRepository.save(interview);
    }

    public void deleteInterview(Long id){
        interviewRepository.deleteById(id);
    }
}
