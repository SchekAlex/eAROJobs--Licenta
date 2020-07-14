package com.backend.lucrarelicenta.service;

import com.backend.lucrarelicenta.model.Review;
import com.backend.lucrarelicenta.model.Role;
import com.backend.lucrarelicenta.model.User;
import com.backend.lucrarelicenta.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> findUserById(Long id){
        return userRepository.findById(id);
    }

    public Optional<User> findUserByRole(String title){
        return userRepository.findByRoleListTitle(title);
    }

    public List<User> findAllUsers(){
        return userRepository.findAll();
    }

    public User addUser(User user){

        User user1 = userRepository.save(user);
        return user1;
    }
    public void deleteUser(Long id){
        userRepository.deleteById(id);
    }

    public List<Role> findUserRole(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isPresent()) {
            return user.get().getRoleList();
        }
        return new ArrayList<>();

    }


}
