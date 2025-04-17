package com.example.birdhealth_management.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.birdhealth_management.entity.User;
import com.example.birdhealth_management.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/signup")
public class SignUpController {
	private final UserService userService;
	
	public SignUpController(UserService userService) {
		this.userService = userService;
	}
	
	@PostMapping
	public void registerUser(@RequestBody User userData) {
		userService.create(userData);
	}
}
