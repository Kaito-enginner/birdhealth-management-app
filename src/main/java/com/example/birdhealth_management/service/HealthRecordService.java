package com.example.birdhealth_management.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.birdhealth_management.entity.Bird;
import com.example.birdhealth_management.entity.HealthRecord;
import com.example.birdhealth_management.repository.BirdRepoitory;
import com.example.birdhealth_management.repository.HealthRecordRepository;

@Service
public class HealthRecordService {
	private final HealthRecordRepository healthRecordRepository;
	private final BirdRepoitory birdRepoitory;

	
	public HealthRecordService(HealthRecordRepository healthRecordRepository, BirdRepoitory birdRepoitory) {
		this.healthRecordRepository = healthRecordRepository;
		this.birdRepoitory = birdRepoitory;
	}
	
	public List<HealthRecord> getMonthlyHealthRecord(Integer id, String date) {
		try {
			Bird bird = birdRepoitory.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
	    LocalDate localDate = LocalDate.parse(date + "-01", DateTimeFormatter.ofPattern("yyyy-MM-dd"));
			LocalDate startDate = localDate.with(TemporalAdjusters.firstDayOfMonth());
			LocalDate endDate = startDate.with(TemporalAdjusters.lastDayOfMonth());
			List<HealthRecord> healthRecords = healthRecordRepository.findUsersByCreatedAtBetween(bird, startDate, endDate);
			return healthRecords;
		} catch (Exception e) {
			return List.of();
		}
	}
}