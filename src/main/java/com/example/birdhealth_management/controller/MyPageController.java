package com.example.birdhealth_management.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.birdhealth_management.entity.Bird;
import com.example.birdhealth_management.entity.User;
import com.example.birdhealth_management.entity.UserBirdDto;
import com.example.birdhealth_management.repository.BirdRepoitory;
import com.example.birdhealth_management.repository.UserRepository;
import com.example.birdhealth_management.service.BirdService;
import com.example.birdhealth_management.service.UserService;


@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/mypage/{id}")
public class MyPageController {
	private final UserRepository userRepository;
	private final BirdRepoitory birdRepoitory;
	private final BirdService birdService;
	private final UserService userService;

	public MyPageController(UserRepository userRepository, BirdRepoitory birdRepoitory, BirdService birdService, UserService userService) {
		this.userRepository = userRepository;
		this.birdRepoitory = birdRepoitory;
		this.birdService = birdService;
		this.userService = userService;
	}

	@GetMapping
  public UserBirdDto getMyPageData(@PathVariable Integer id) {
		User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
		List<Bird> birds = birdRepoitory.findByUserId(user);
		return new UserBirdDto(birds, user.getId(), user.getName(), user.getAge(),user.getEmail());
  }
	
	@PostMapping("/register")
	public void regiterBird(@PathVariable Integer id, @RequestBody Bird bird) {
		birdService.create(id, bird);
	}
	
	@PostMapping("/edit/bird")
	public void editBird(@RequestBody Bird bird) {
		birdService.update(bird);
	}
	
	@PostMapping("/edit/user")
	public void editUser(@PathVariable Integer id, @RequestBody User user) {
		userService.update(id, user);
	}

}
