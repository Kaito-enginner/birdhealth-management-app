package com.example.birdhealth_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.birdhealth_management.entity.Bird;

public interface BirdRepoitory extends JpaRepository<Bird, Integer> {

}
