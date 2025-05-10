package com.example.birdhealth_management.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.birdhealth_management.entity.HealthRecord;
import com.example.birdhealth_management.service.HealthRecordService;

@RestController
//@CrossOrigin(origins = {"http://localhost:5173", "https://birdhealth-management-app-ef0e3e571032.herokuapp.com"})
@RequestMapping("/homepage/{id}")
public class HomePageController {
	private final HealthRecordService healthRecordService;

	public HomePageController(HealthRecordService healthRecordService) {
		this.healthRecordService = healthRecordService;
	}
	
	@PostMapping("/{date}/register")
  public void registerHealthRecord(@PathVariable Integer id, @PathVariable String date, @RequestBody HealthRecord healthRecord) {
		healthRecordService.create(id, date, healthRecord);
  }
	
	@PostMapping("/edit")
  public void editHealthRecord(@RequestBody HealthRecord healthRecord) {
		healthRecordService.update(healthRecord);
  }
}
