package com.backend.lucrarelicenta.controller;

import com.backend.lucrarelicenta.dto.RoleDto;
import com.backend.lucrarelicenta.dto.UserDto;
import com.backend.lucrarelicenta.exceptions.JobPostNotFoundException;
import com.backend.lucrarelicenta.exceptions.UserNotAuthorized;
import com.backend.lucrarelicenta.exceptions.UserNotFoundException;
import com.backend.lucrarelicenta.model.JobPost;
import com.backend.lucrarelicenta.model.Role;
import com.backend.lucrarelicenta.model.User;
import com.backend.lucrarelicenta.model.UserDetailsImpl;
import com.backend.lucrarelicenta.repository.RoleRepository;
import com.backend.lucrarelicenta.repository.UserRepository;
import com.backend.lucrarelicenta.service.JobPostService;
import com.backend.lucrarelicenta.service.RoleService;
import com.backend.lucrarelicenta.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {


    private UserService userService;
    private RoleService roleService;
    private PasswordEncoder passwordEncoder;
    private final JobPostService jobPostService;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public UserController(UserService userService, RoleService roleService, PasswordEncoder passwordEncoder, JobPostService jobPostService, UserRepository userRepository, RoleRepository roleRepository) {
        this.userService = userService;
        this.roleService = roleService;
        this.passwordEncoder = passwordEncoder;
        this.jobPostService = jobPostService;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @GetMapping
    public ResponseEntity<List<User>> findAllUsers(){
        List<User> userList = userService.findAllUsers();
        return ResponseEntity.ok(userList);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<User> findUserByEmail(@PathVariable String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (!user.isPresent()) {
            throw new UserNotFoundException("User with email : " + email + " was not found !");
        }

        return ResponseEntity.ok(user.get());
    }

    @PostMapping
    public ResponseEntity<User> addUser(@RequestBody UserDto userDto){
           User user = new User();

           user.setFirstName(userDto.getFirstName());
           user.setLastName(userDto.getLastName());
           user.setEmail(userDto.getEmail());
           user.setPassword(passwordEncoder.encode(userDto.getPassword()));
           user.setBirthDate(userDto.getBirthDate());

           Optional<Role> role = roleService.findRole("Candidat");
           List<Role> rolesList = new ArrayList<>();
           role.ifPresent(rolesList::add);

           user.setRoleList(rolesList);

           user.setReviews(new ArrayList<>());

           user.setInterviews(new ArrayList<>());

           user.setJobPost(new ArrayList<>());

           user.setRecommendation(new ArrayList<>());

           User savedUser = userService.addUser(user);
           URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedUser.getId()).toUri();

           return ResponseEntity.created(location).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<User>> findUserById(Principal principal, @PathVariable Long id){
        Long principalId = ((UserDetailsImpl)((UsernamePasswordAuthenticationToken) principal).getPrincipal()).getUser().getId();
        if (!principalId.equals(id)) {
            throw new UserNotAuthorized(principalId.toString());
        }
        Optional<User> user = userService.findUserById(id);
        if(!user.isPresent()){
              throw new UserNotFoundException("User with id: "+ id +" not found");
        }
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Optional<User>> deleteUser(@PathVariable Long id){
        Optional<User> user = userService.findUserById(id);
        if(!user.isPresent()){
            throw new UserNotFoundException("User with id: "+ id +" not found");
        }

        userService.deleteUser(id);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/{email}")
    public ResponseEntity<Optional<User>> updateUser(Principal principal, @PathVariable String email, @RequestBody UserDto userDto) {
        String principalEmail = ((UserDetailsImpl)((UsernamePasswordAuthenticationToken) principal).getPrincipal()).getUser().getEmail();
        if (!principalEmail.equals(email)) {
            throw new UserNotAuthorized(principalEmail);
        }
        Optional<User> foundUser = userRepository.findByEmail(email);
        foundUser.get().setFirstName(userDto.getFirstName());
        foundUser.get().setLastName(userDto.getLastName());
        foundUser.get().setEmail(userDto.getEmail());
        User savedUser = userService.addUser(foundUser.get());
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().build().toUri();

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/getRole/{email}")
    public ResponseEntity<RoleDto> getUserRole(@PathVariable String email){
        List<Role> userRole = userService.findUserRole(email);

        RoleDto roleDto = new RoleDto();

        List<String> roles = new ArrayList<>();

        for(Role role: userRole) {
            roles.add(role.getTitle());
        }
        roleDto.setRoles(roles);

        return ResponseEntity.ok(roleDto);
    }

    @PutMapping("/add-job/{jobId}/{userId}")
    public ResponseEntity<String> addJobPostToUser(@PathVariable Long jobId, @PathVariable Long userId) {
        Optional<User> user = userService.findUserById(userId);

        if (!user.isPresent()) {
            throw new UserNotFoundException("User with id: "+ userId +" not found");
        }

        Optional<JobPost> jobPost = jobPostService.findJobPostById(jobId);

        if (!jobPost.isPresent()) {
            throw new JobPostNotFoundException("JobPost with id: "+ jobId +" not found");
        }

        List<JobPost> userJobs = user.get().getJobPost();
        userJobs.add(jobPost.get());
        userService.addUser(user.get());

        List<User> jobUsers = jobPost.get().getUsers();
        jobUsers.add(user.get());
        jobPostService.addJobPost(jobPost.get());

        return ResponseEntity.ok("Success");
    }

    @PutMapping("/{userId}/changeRole/{roleTitle}")
    public ResponseEntity<String> changeRole(@PathVariable Long userId, @PathVariable String roleTitle) {
        Optional<Role> role = roleRepository.findByTitle(roleTitle);
        Optional<User> user = userRepository.findById(userId);

        user.get().getRoleList().clear();
        List<Role> roleList = new ArrayList<>();
        roleList.add(role.get());
        user.get().setRoleList(roleList);

        userService.addUser(user.get());

        return ResponseEntity.ok().body("Changed Role");
    }

}
