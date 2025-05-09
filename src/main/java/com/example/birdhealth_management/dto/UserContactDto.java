package com.example.birdhealth_management.dto;

import lombok.Data;

@Data
public class UserContactDto {
	private ContactDto contact;

	private Integer userId;
	private String userName;
	private String userEmail;

	public UserContactDto(ContactDto contact, Integer userId, String userName, String userEmail) {
  	this.contact = contact;
  	this.userId = userId;
  	this.userName = userName;
  	this.userEmail = userEmail;
  }
}
