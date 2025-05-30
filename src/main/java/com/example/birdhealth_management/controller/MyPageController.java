package com.example.birdhealth_management.controller;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.birdhealth_management.dto.BirdDto;
import com.example.birdhealth_management.dto.UserBirdDto;
import com.example.birdhealth_management.entity.Bird;
import com.example.birdhealth_management.entity.User;
import com.example.birdhealth_management.repository.BirdRepository;
import com.example.birdhealth_management.security.UserDetailsImpl;
import com.example.birdhealth_management.service.BirdService;
import com.example.birdhealth_management.service.UserService;


@RestController
//@CrossOrigin(origins = {"http://localhost:5173", "https://birdhealth-management-app-ef0e3e571032.herokuapp.com"})
@RequestMapping("/api/mypage")
public class MyPageController {
	private final BirdRepository birdRepository;
	private final BirdService birdService;
	private final UserService userService;

	public MyPageController(BirdRepository birdRepository, BirdService birdService, UserService userService) {
		this.birdRepository = birdRepository;
		this.birdService = birdService;
		this.userService = userService;
	}

	@GetMapping
  public UserBirdDto getMyPageData(@AuthenticationPrincipal UserDetailsImpl userDetails) {
		User user = userDetails.getUser();
		List<Bird> birds = birdRepository.findByUserId(user);
		List<BirdDto> birdDtos = birdService.convertToDto(birds);
		return new UserBirdDto(birdDtos, user.getName(), user.getEmail());
  }
	
	@PostMapping("/birdregister")
	public void regiterBird(@AuthenticationPrincipal UserDetailsImpl userDetails, @RequestBody Bird bird) {
		User user = userDetails.getUser();
		birdService.create(user, bird);
	}
	
	@PostMapping("/birdedit")
	public void editBird(@RequestBody Bird bird) {
		birdService.update(bird);
	}
	
	@PostMapping("/useredit")
	public void editUser(@AuthenticationPrincipal UserDetailsImpl userDetails, @RequestBody User userData) {
		User user = userDetails.getUser();
		userService.update(user, userData);
	}
	
	@PostMapping("/useredit/pass")
	public void editUserPassword(@AuthenticationPrincipal UserDetailsImpl userDetails, @RequestBody User userData) {
		User user = userDetails.getUser();
		userService.passwordUpdate(user, userData);
	}

}
