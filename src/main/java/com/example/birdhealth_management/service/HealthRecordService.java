package com.example.birdhealth_management.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.birdhealth_management.entity.Bird;
import com.example.birdhealth_management.entity.HealthRecord;
import com.example.birdhealth_management.repository.BirdRepository;
import com.example.birdhealth_management.repository.HealthRecordRepository;

@Service
public class HealthRecordService {
	private final HealthRecordRepository healthRecordRepository;
	private final BirdRepository birdRepository;

	
	public HealthRecordService(HealthRecordRepository healthRecordRepository, BirdRepository birdRepository) {
		this.healthRecordRepository = healthRecordRepository;
		this.birdRepository = birdRepository;
	}
	
	// 月間の健康記録を取得する
	public List<HealthRecord> getMonthlyHealthRecord(Integer id, String date) {
		try {
			Bird bird = birdRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
	    LocalDate localDate = LocalDate.parse(date + "-01", DateTimeFormatter.ofPattern("yyyy-MM-dd"));
			LocalDate startDate = localDate.with(TemporalAdjusters.firstDayOfMonth());
			LocalDate endDate = startDate.with(TemporalAdjusters.lastDayOfMonth());
			List<HealthRecord> healthRecords = healthRecordRepository.findUsersByCreatedAtBetween(bird, startDate, endDate);
			return healthRecords;
		} catch (Exception e) {
			return List.of();
		}
	}
	
	@Transactional
	public void create(Integer id, String date, HealthRecord healthRecord) {
		HealthRecord newHealthRecord = new HealthRecord();
		Bird bird = birdRepository.getReferenceById(id);
		LocalDate formattedDate = LocalDate.parse(date, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
		
		newHealthRecord.setBirdId(bird);
		newHealthRecord.setDay(formattedDate);
		newHealthRecord.setWeight(healthRecord.getWeight());
		newHealthRecord.setMealAmount(healthRecord.getMealAmount());
		newHealthRecord.setHumidity(healthRecord.getHumidity());
		newHealthRecord.setTemperature(healthRecord.getTemperature());
		newHealthRecord.setMemo(healthRecord.getMemo());
		
		healthRecordRepository.save(newHealthRecord);
	}
	
	@Transactional
	public void update(HealthRecord healthRecord) {
		HealthRecord newHealthRecord = healthRecordRepository.getReferenceById(healthRecord.getId());
		
		newHealthRecord.setWeight(healthRecord.getWeight());
		newHealthRecord.setMealAmount(healthRecord.getMealAmount());
		newHealthRecord.setHumidity(healthRecord.getHumidity());
		newHealthRecord.setTemperature(healthRecord.getTemperature());
		newHealthRecord.setMemo(healthRecord.getMemo());
		
		healthRecordRepository.save(newHealthRecord);
	}
}