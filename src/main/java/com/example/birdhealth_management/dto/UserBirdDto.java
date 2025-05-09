package com.example.birdhealth_management.dto;

import java.util.List;

import lombok.Data;

@Data
public class UserBirdDto {
	private List<BirdDto> birds;

  private String userName;
  private String userEmail;

  // コンストラクタ
  public UserBirdDto(List<BirdDto> birds, String userName, String userEmail) {
  	this.birds = birds;
  	this.userName = userName;
  	this.userEmail = userEmail;
  }
}

