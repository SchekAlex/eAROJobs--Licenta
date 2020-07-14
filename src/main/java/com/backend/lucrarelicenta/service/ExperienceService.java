package com.backend.lucrarelicenta.service;

import com.backend.lucrarelicenta.model.Experience;
import com.backend.lucrarelicenta.repository.ExperienceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExperienceService {
    private ExperienceRepository experienceRepository;

    public ExperienceService(ExperienceRepository experienceRepository) {
        this.experienceRepository = experienceRepository;
    }

    public Optional<Experience> findById(Long id){
        return experienceRepository.findById(id);
    }

    public List<Experience> findByCvId(Long id){
        return experienceRepository.findByCvId(id);
    }

    public List<Experience> findAll(){
        return experienceRepository.findAll();
    }

    public Experience addExperience(Experience experience){
        return experienceRepository.save(experience);
    }

    public void deleteExperienceById(Long id){
        experienceRepository.deleteById(id);
    }
}
