package com.example.birdhealth_management.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.birdhealth_management.dto.BirdDto;
import com.example.birdhealth_management.entity.Bird;
import com.example.birdhealth_management.entity.User;
import com.example.birdhealth_management.repository.BirdRepository;

@Service
public class BirdService {
	private final BirdRepository birdRepository;

	public BirdService(BirdRepository birdRepository) {
		this.birdRepository = birdRepository;
	}

	@Transactional
	public void create(User user, Bird birdData) {
		Bird newBird = new Bird();
		
		newBird.setUserId(user);
		newBird.setName(birdData.getName());
		newBird.setGender(birdData.getGender());
		newBird.setBirthday(birdData.getBirthday());
		newBird.setBestWeight(birdData.getBestWeight());

		birdRepository.save(newBird);
	}

	@Transactional
	public void update(Bird birdData) {
		Bird updateBird = birdRepository.getReferenceById(birdData.getId());

		updateBird.setName(birdData.getName());
		updateBird.setGender(birdData.getGender());
		updateBird.setBirthday(birdData.getBirthday());
		updateBird.setBestWeight(birdData.getBestWeight());

		birdRepository.save(updateBird);
	}

	//Bird型→BirdDtoに変換
	public List<BirdDto> convertToDto(List<Bird> birds) {
		List<BirdDto> birdDtos = new ArrayList<BirdDto>();
		for (int i = 0; i < birds.size(); i++) {
			Bird bird = birds.get(i);
			BirdDto birdDto = new BirdDto();
			
			birdDto.setId(bird.getId());
			birdDto.setName(bird.getName());
			birdDto.setGender(bird.getGender());
			birdDto.setBirthday(bird.getBirthday());
			birdDto.setBestWeight(bird.getBestWeight());
			birdDto.setCreatedAt(bird.getCreatedAt());
			birdDto.setUpdatedAt(bird.getUpdatedAt());
			
			birdDtos.add(birdDto);
		}

		return birdDtos;
	}
}
