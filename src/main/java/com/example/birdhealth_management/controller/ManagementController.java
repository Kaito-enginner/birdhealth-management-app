package com.example.birdhealth_management.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.birdhealth_management.dto.UserDto;
import com.example.birdhealth_management.entity.User;
import com.example.birdhealth_management.exception.UserNotFoundException;
import com.example.birdhealth_management.repository.UserRepository;
import com.example.birdhealth_management.service.UserService;

@RestController
//@CrossOrigin(origins = {"http://localhost:5173", "https://birdhealth-management-app-ef0e3e571032.herokuapp.com"})
@RequestMapping("/api/managementpage")
public class ManagementController {
	private final UserRepository userRepository;
	private final UserService userService;

	public ManagementController(UserRepository userRepository, UserService userService) {
		this.userRepository = userRepository;
		this.userService = userService;
	}

	@GetMapping
	public List<UserDto> getManegementPageData() {
		List<User> users = userRepository.findAll();
		List<UserDto> UserDtos = userService.convertToDto(users);
		return UserDtos;
	}

	@PostMapping("/delete")
	public ResponseEntity<String> delete(@RequestBody Integer id) {
		try {
			User user = userService.disable(id);
			String action = user.getEnabled() ? "有効化" : "無効化";
			return ResponseEntity.ok("ID；" + id + "のアカウントを" + action + "しました。");
		} catch (UserNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ID；" + id + "のユーザーが見つかりませんでした。");
		}
	}
}
