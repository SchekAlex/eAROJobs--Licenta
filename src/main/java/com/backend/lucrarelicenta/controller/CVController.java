package com.backend.lucrarelicenta.controller;

import com.backend.lucrarelicenta.dto.CVDto;
import com.backend.lucrarelicenta.dto.ExperienceDto;
import com.backend.lucrarelicenta.exceptions.CVNotFoundException;
import com.backend.lucrarelicenta.model.CV;
import com.backend.lucrarelicenta.model.User;
import com.backend.lucrarelicenta.repository.CVRepository;
import com.backend.lucrarelicenta.repository.UserRepository;
import com.backend.lucrarelicenta.service.CVService;
import com.backend.lucrarelicenta.service.ExperienceService;
import com.backend.lucrarelicenta.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cvs")
@CrossOrigin(origins = "http://localhost:3000")
public class CVController {
    private CVService cvService;
    private UserService userService;
    private ExperienceService experienceService;
    private CVRepository cvRepository;
    private final UserRepository userRepository;

    public CVController(CVService cvService, UserService userService, ExperienceService experienceService, CVRepository cvRepository, UserRepository userRepository) {
        this.cvService = cvService;
        this.userService = userService;
        this.experienceService = experienceService;
        this.cvRepository = cvRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<CV>> findAllCvs(){
        List<CV> cvList = cvService.findAll();
        return ResponseEntity.ok(cvList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<CV>> findCVById(@PathVariable Long id){
        Optional<CV> cv = cvService.findCVById(id);

        if(!cv.isPresent()){
            throw new CVNotFoundException("CV with id: " + " not found");
        }

        return ResponseEntity.ok(cv);
    }

    @PostMapping
    public ResponseEntity<CV> addCV(@RequestBody CVDto cvDto) {
        CV cv1 = new CV();

        Optional<User> user = userRepository.findByEmail(cvDto.getUserEmail());


        cv1.setDescription(cvDto.getDescription());
        cv1.setEducation(cvDto.getEducation());
        cv1.setSkills(cvDto.getSkills());
        cv1.setUser(user.get());

        CV savedCV = cvService.addCV(cv1);
        user.get().setCv(savedCV);
        userService.addUser(user.get());
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedCV.getId()).toUri();
        return ResponseEntity.created(location).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Optional<CV>> deleteCvById(@PathVariable Long id ){
        Optional<CV> cvOptional = cvService.findCVById(id);
        if(!cvOptional.isPresent()){
            throw new CVNotFoundException("CV with id: " + " not found");
        }

        cvService.deleteCvById(id);
        return ResponseEntity.ok(cvOptional);
    }

    @PutMapping("/{email}")
    public ResponseEntity<Optional<CV>> updateUser(@PathVariable String email, @RequestBody CVDto cvDto) {

        Optional<CV> foundCv = cvRepository.findByUserEmail(email);

        if (!foundCv.isPresent()) {
            throw new CVNotFoundException("CV with email " + email + " not found");
        }

        if (!cvDto.getSkills().isEmpty()) {
            foundCv.get().setSkills(cvDto.getSkills());
        }
        if (!cvDto.getDescription().isEmpty()) {
            foundCv.get().setDescription(cvDto.getDescription());
        }
        if (!cvDto.getEducation().isEmpty()) {
            foundCv.get().setEducation(cvDto.getEducation());
        }

        cvService.addCV(foundCv.get());

        return ResponseEntity.ok().build();
    }

    @PutMapping("/add-experience/{id}")
    public ResponseEntity<Optional<CV>> addExperience(@PathVariable Long id, @RequestBody ExperienceDto experienceDto) {

        Optional<CV> foundCv = cvService.findCVById(id);

        if (!foundCv.isPresent()) {
            throw new CVNotFoundException("CV with id " + id + " not found");
        }

        cvService.addExperience(experienceDto, id);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Optional<CV>> getCVByEmail(@PathVariable String email) {
        Optional<CV> foundCv = cvRepository.findByUserEmail(email);
        if (!foundCv.isPresent()) {
            throw new CVNotFoundException("CV with email " + email + " not found");
        }

        return ResponseEntity.ok().body(foundCv);
    }

}
