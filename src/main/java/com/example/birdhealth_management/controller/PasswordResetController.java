package com.example.birdhealth_management.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.birdhealth_management.dto.PasswordResetRequestDto;
import com.example.birdhealth_management.service.UserService;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "https://birdhealth-management-app-ef0e3e571032.herokuapp.com"})
@RequestMapping("/reset")
public class PasswordResetController {
	private final UserService userService;
	
	public PasswordResetController(UserService userService) {
		this.userService= userService;
	}
	
	@PostMapping
	public void passwordResetReception(@RequestBody PasswordResetRequestDto email) {
		userService.passwordReset(email);
	}
}
