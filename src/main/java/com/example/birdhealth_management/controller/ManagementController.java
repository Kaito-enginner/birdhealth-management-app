package com.example.birdhealth_management.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.birdhealth_management.dto.UserDto;
import com.example.birdhealth_management.entity.User;
import com.example.birdhealth_management.repository.UserRepository;
import com.example.birdhealth_management.service.UserService;

@RestController
//@CrossOrigin(origins = {"http://localhost:5173", "https://birdhealth-management-app-ef0e3e571032.herokuapp.com"})
@RequestMapping("/managementpage")
public class ManagementController {
	private final UserRepository userRepository;
	private final UserService userService;

	public ManagementController(UserRepository userRepository, UserService userService) {
		this.userRepository = userRepository;
		this.userService = userService;
	}
	
	@GetMapping
	public List<UserDto> getManegementPageData() {
		List<User> allUser = userRepository.findAll();
		List<UserDto> allUserDto = userService.convertToDto(allUser);
		return allUserDto;
	}
	
	@PostMapping("/delete")
	public ResponseEntity<String> delete(@RequestBody Integer id) {
		userRepository.deleteById(id);
		return ResponseEntity.ok("ID；" + id + "のアカウントを削除しました。");
	}
}
