package com.example.birdhealth_management.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.birdhealth_management.entity.HealthRecord;
import com.example.birdhealth_management.service.HealthRecordService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/chartpage/{id}/{date}")
public class ChartPageController {
	private final HealthRecordService healthRecordService;

	public ChartPageController(HealthRecordService healthRecordService) {
		this.healthRecordService = healthRecordService;
	}

	
	@GetMapping
  public List<HealthRecord> getChartPageData(@PathVariable Integer id, @PathVariable String date) {
			List<HealthRecord> healthRecord = healthRecordService.getMonthlyHealthRecord(id, date);
			return healthRecord;
  }
}
