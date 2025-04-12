package com.example.birdhealth_management.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.birdhealth_management.entity.Bird;
import com.example.birdhealth_management.entity.User;
import com.example.birdhealth_management.repository.BirdRepoitory;
import com.example.birdhealth_management.repository.UserRepository;

@Service
public class BirdService {
	private final UserRepository userRepository;
	private final BirdRepoitory birdRepoitory;
	
	public BirdService (UserRepository userRepository, BirdRepoitory birdRepoitory) {
		this.userRepository = userRepository;
		this.birdRepoitory = birdRepoitory;
	}
	
	@Transactional
	public void create(Integer id, Bird birdData) {
		Bird newBird = new Bird();
		User user = userRepository.getReferenceById(id);
		
		newBird.setUserId(user);
		newBird.setName(birdData.getName());
		newBird.setAge(birdData.getAge());
		newBird.setGender(birdData.getGender());
		newBird.setBirthday(birdData.getBirthday());
		newBird.setBestWeight(birdData.getBestWeight());
		
		birdRepoitory.save(newBird);
	}

	@Transactional
	public void update(Bird birdData) {
		Bird updateBird = birdRepoitory.getReferenceById(birdData.getId());
		
		updateBird.setName(birdData.getName());
		updateBird.setAge(birdData.getAge());
		updateBird.setGender(birdData.getGender());
		updateBird.setBirthday(birdData.getBirthday());
		updateBird.setBestWeight(birdData.getBestWeight());
		
		birdRepoitory.save(updateBird);
	}
}

