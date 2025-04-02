package com.example.birdhealth_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.birdhealth_management.entity.HealthRecord;

public interface HealthRecordRepository extends JpaRepository<HealthRecord, Integer> {

}
