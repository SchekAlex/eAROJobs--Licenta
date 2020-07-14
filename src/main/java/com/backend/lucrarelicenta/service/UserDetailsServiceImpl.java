package com.backend.lucrarelicenta.service;

import com.backend.lucrarelicenta.model.User;
import com.backend.lucrarelicenta.model.UserDetailsImpl;
import com.backend.lucrarelicenta.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByEmail(s);
        if (! user.isPresent()) throw new UsernameNotFoundException(s + " was not found!");
        User foundUser = user.get();
        return new UserDetailsImpl(foundUser);
    }
}