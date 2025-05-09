package com.example.birdhealth_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.birdhealth_management.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {
	public Role findByName(String name);
}
