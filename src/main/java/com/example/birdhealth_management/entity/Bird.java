package com.example.birdhealth_management.entity;
import java.sql.Timestamp;

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
@Table(name = "birds")
@Data
public class Bird {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Integer id;
  
  @ManyToOne
  @JoinColumn(name = "user_id")
  private User userId;   
  
  @Column(name = "name")
  private String name;   
  
  @Column(name = "age")
  private Integer age;
      
  @Column(name = "gender")
  private String gender;    
      
  @Column(name = "birthday")
  private String birthday;
      
  @Column(name = "best_weight")
  private Integer bestWeight;
  
  @Column(name = "created_at", insertable = false, updatable = false)
  private Timestamp createdAt;
  
  @Column(name = "updated_at", insertable = false, updatable = false)
  private Timestamp updatedAt;     

}