package com.example.birdhealth_management.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.birdhealth_management.entity.User;
import com.example.birdhealth_management.service.UserService;

@RestController
//@CrossOrigin(origins = {"http://localhost:5173", "https://birdhealth-management-app-ef0e3e571032.herokuapp.com"})
@RequestMapping("/signup")
public class SignUpController {
	private final UserService userService;
	
	public SignUpController(UserService userService) {
		this.userService = userService;
	}
	
	@PostMapping
	public void registerNewUser(@RequestBody User userData) {
		userService.create(userData);
	}
}
