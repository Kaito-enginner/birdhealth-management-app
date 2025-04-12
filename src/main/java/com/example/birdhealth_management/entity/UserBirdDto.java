package com.example.birdhealth_management.entity;

import java.util.List;

import lombok.Data;

@Data
public class UserBirdDto {
	private List<Bird> birds;

  private Integer userId;
  private String userName;
  private Integer userAge;
  private String userEmail;

  // コンストラクタ
  public UserBirdDto(List<Bird> birds, Integer userId, String userName, Integer userage, String userEmail) {
  	this.birds = birds;
  	this.userId = userId;
  	this.userName = userName;
  	this.userAge = userage;
  	this.userEmail = userEmail;
  }
}

