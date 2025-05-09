package com.example.birdhealth_management.dto;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class BirdDto {
  private Integer id;
  private String name;
  private String gender;
  private String birthday;
  private Integer bestWeight;
  private Timestamp createdAt;
  private Timestamp updatedAt;

}