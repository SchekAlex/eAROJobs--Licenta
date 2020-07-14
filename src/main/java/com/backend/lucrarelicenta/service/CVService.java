package com.backend.lucrarelicenta.service;

import com.backend.lucrarelicenta.dto.ExperienceDto;
import com.backend.lucrarelicenta.exceptions.CVNotFoundException;
import com.backend.lucrarelicenta.model.CV;
import com.backend.lucrarelicenta.model.Experience;
import com.backend.lucrarelicenta.repository.CVRepository;
import com.backend.lucrarelicenta.repository.ExperienceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CVService {
    private CVRepository cvRepository;
    private final ExperienceRepository experienceRepository;

    public CVService(CVRepository cvRepository, ExperienceRepository experienceRepository) {
        this.cvRepository = cvRepository;
        this.experienceRepository = experienceRepository;
    }

    public Optional<CV> findCVById(Long id){
        return cvRepository.findById(id);
    }

    public List<CV> findAll(){
        return cvRepository.findAll();
    }

    public CV addCV(CV cv){
         return cvRepository.save(cv);
    }

    public void deleteCvById(Long id){
        cvRepository.deleteById(id);
    }

    public void addExperience(ExperienceDto experienceDto, Long id) {
        Optional<CV> foundCv = cvRepository.findById(id);

        if (!foundCv.isPresent()) {
            throw new CVNotFoundException("CV with id :" + id + " not found");
        }

        Experience experience = new Experience();
        experience.setCompanyName(experienceDto.getCompanyName());
        experience.setCv(foundCv.get());
        experience.setDescription(experienceDto.getJobDescription());
        experience.setEmploymentDuration(experienceDto.getEmploymentDuration());
        experience.setJobTitle(experienceDto.getJobTitle());

        List<Experience> experiences = experienceRepository.findByCvId(id);
        experiences.add(experience);

        foundCv.get().setExperience(experiences);

        cvRepository.save(foundCv.get());
    }
}
