package com.example.birdhealth_management.entity;

import java.sql.Timestamp;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "health_records")
@Data
public class HealthRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    
    @ManyToOne
    @JoinColumn(name = "bird_id")
    private Bird birdId;
    
    @Column(name = "day")
    private LocalDate day;
    
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
    
    @Column(name = "created_at", insertable = false, updatable = false)
    private Timestamp createdAt;
    
    @Column(name = "updated_at", insertable = false, updatable = false)
    private Timestamp updatedAt;     
}
