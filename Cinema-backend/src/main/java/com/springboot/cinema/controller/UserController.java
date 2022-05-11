package com.springboot.cinema.controller;

import com.springboot.cinema.exception.ResourceNotFoundException;
import com.springboot.cinema.model.User;
import com.springboot.cinema.payload.*;
import com.springboot.cinema.repository.HallRepository;
import com.springboot.cinema.repository.MovieRepository;
import com.springboot.cinema.repository.UserRepository;
import com.springboot.cinema.security.UserPrincipal;
import com.springboot.cinema.security.CurrentUser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private HallRepository hallRepository;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        UserSummary userSummary = new UserSummary(currentUser.getId(), currentUser.getUsername(), currentUser.getName(),currentUser.getAddress(), currentUser.getPhone());
        return userSummary;
    }

    @GetMapping("/user/checkUsernameAvailability")
    public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "username") String username) {
        Boolean isAvailable = !userRepository.existsByUsername(username);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/user/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !userRepository.existsByEmail(email);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("users/{username}")
    public ResponseEntity<User> getProfileByUsername(@PathVariable String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not exist with username :" + username));
        return ResponseEntity.ok(user);
    }

    // update user rest api

    @PutMapping("users/{username}")
    public ResponseEntity<User> updateProfile(@PathVariable String username, @RequestBody User profileDetails){
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not exist with id :" + username));

        user.setName(profileDetails.getName());
        user.setAddress(profileDetails.getAddress());
        user.setPhone(profileDetails.getPhone());

        User updatedProfile = userRepository.save(user);
        return ResponseEntity.ok(updatedProfile);
    }

}