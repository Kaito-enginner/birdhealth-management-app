package com.example.birdhealth_management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.birdhealth_management.entity.Bird;
import com.example.birdhealth_management.entity.User;

public interface BirdRepoitory extends JpaRepository<Bird, Integer> {
	public List<Bird> findByUserId(User user);
}
