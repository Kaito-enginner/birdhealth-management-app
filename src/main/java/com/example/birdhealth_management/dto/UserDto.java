package com.example.birdhealth_management.dto;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class UserDto {
	private Integer id;
	private String name;
	private String email;
	private Integer consecutive_login_days;
	private Timestamp createdAt;
	private Timestamp updatedAt;
}
