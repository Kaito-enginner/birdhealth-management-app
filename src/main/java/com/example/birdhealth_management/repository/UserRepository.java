package com.example.birdhealth_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.birdhealth_management.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	public User findByEmail(String email);
}
