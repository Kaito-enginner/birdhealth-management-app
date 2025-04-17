package com.example.birdhealth_management.entity;

import jakarta.persistence.Column;

import lombok.Data;

@Data
public class HealthRecordFetch {

  @Column(name = "weight")
  private Integer weight;
      
  @Column(name = "meal_amount")
  private Integer mealAmount;    
      
  @Column(name = "temperature")
  private Integer temperature;
  
  @Column(name = "humidity")
  private Integer humidity;
  
  @Column(name = "memo")
  private String memo; 
}
