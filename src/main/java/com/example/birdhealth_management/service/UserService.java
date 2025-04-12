package com.example.birdhealth_management.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.birdhealth_management.entity.User;
import com.example.birdhealth_management.repository.UserRepository;

@Service
public class UserService {
	private final UserRepository userRepository;
	
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	@Transactional
	public void update(Integer id, User userData) {
		User updateUser = userRepository.getReferenceById(id);
		
		updateUser.setName(userData.getName());
		updateUser.setAge(userData.getAge());
		updateUser.setEmail(userData.getEmail());
		updateUser.setPassword(userData.getPassword());
		
		userRepository.save(updateUser);
	}
}
