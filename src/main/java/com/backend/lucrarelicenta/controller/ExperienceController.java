package com.backend.lucrarelicenta.controller;

import com.backend.lucrarelicenta.dto.ExperienceDto;
import com.backend.lucrarelicenta.exceptions.ExperienceNotFoundException;
import com.backend.lucrarelicenta.model.CV;
import com.backend.lucrarelicenta.model.Experience;
import com.backend.lucrarelicenta.service.CVService;
import com.backend.lucrarelicenta.service.ExperienceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/experiences")
public class ExperienceController {
    private ExperienceService experienceService;
    private CVService cvService;


    public ExperienceController(ExperienceService experienceService,CVService cvService) {
        this.experienceService = experienceService;
        this.cvService = cvService;

    }

    @GetMapping
    public ResponseEntity<List<Experience>> findAllExperiences(){
        List<Experience> experienceList = experienceService.findAll();
        return ResponseEntity.ok(experienceList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Experience>> findExperienceById(@PathVariable Long id){
        Optional<Experience> experience = experienceService.findById(id);
        if(!experience.isPresent()){
            throw new ExperienceNotFoundException("Experience with id: " + id + " not found");
        }
        return ResponseEntity.ok(experience);
    }
    @PostMapping
    public ResponseEntity<Experience> addExperience(@RequestBody ExperienceDto experienceDto){
        Experience newExperience = new Experience();

        Optional<CV> cv = cvService.findCVById(experienceDto.getCvId());

        newExperience.setCv(cv.get());
        newExperience.setCompanyName(experienceDto.getCompanyName());
        newExperience.setJobTitle(experienceDto.getJobTitle());
        newExperience.setEmploymentDuration(experienceDto.getEmploymentDuration());
        newExperience.setDescription(experienceDto.getJobDescription());

        Experience savedExperience = experienceService.addExperience(newExperience);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedExperience.getId()).toUri();
        return ResponseEntity.created(location).build();

    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Optional<Experience>> deleteExperience(@PathVariable Long id){
        Optional<Experience> experience = experienceService.findById(id);

        if(!experience.isPresent()){
            throw new ExperienceNotFoundException("Experience with id: " + id + " not found");
        }

        experienceService.deleteExperienceById(id);

        return ResponseEntity.ok(experience);
    }


 }
