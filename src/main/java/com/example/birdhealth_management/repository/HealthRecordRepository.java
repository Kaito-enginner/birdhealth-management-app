package com.example.birdhealth_management.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.birdhealth_management.entity.Bird;
import com.example.birdhealth_management.entity.HealthRecord;

public interface HealthRecordRepository extends JpaRepository<HealthRecord, Integer> {
//	public List<HealthRecord> findByBirdId(Bird bird);
	@Query(value = "SELECT h FROM HealthRecord h WHERE h.birdId = :bird AND h.day BETWEEN :startDate AND :endDate")
	List<HealthRecord> findUsersByCreatedAtBetween(@Param("bird") Bird bird, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
}
