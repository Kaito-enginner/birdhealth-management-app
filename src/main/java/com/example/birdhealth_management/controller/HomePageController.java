package com.example.birdhealth_management.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.birdhealth_management.entity.HealthRecordFetch;
import com.example.birdhealth_management.service.HealthRecordService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/homepage/{id}")
public class HomePageController {
	private final HealthRecordService healthRecordService;

	public HomePageController(HealthRecordService healthRecordService) {
		this.healthRecordService = healthRecordService;
	}

	
	@PostMapping("/{date}/register")
  public void getChartPageData(@PathVariable Integer id, @PathVariable String date, @RequestBody HealthRecordFetch healthRecordFetch) {
		healthRecordService.create(id, date, healthRecordFetch);
		
  }

}
