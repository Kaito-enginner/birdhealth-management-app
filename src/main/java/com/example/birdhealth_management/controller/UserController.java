package com.example.birdhealth_management.controller;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.birdhealth_management.entity.User;
import com.example.birdhealth_management.repository.UserRepository;

@RestController
@CrossOrigin(origins = "*") // 適切なドメインに変更
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/mypage/{id}")
    @ResponseBody
    public ResponseEntity<User> mypage(@PathVariable Integer id) {
        Optional<User> userData = userRepository.findById(id);
        return userData.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
