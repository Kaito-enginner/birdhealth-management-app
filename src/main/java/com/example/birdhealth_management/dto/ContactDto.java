package com.example.birdhealth_management.dto;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class ContactDto {
	private Integer id;
	private String email;
	private String content;
	private Boolean status;
	private Timestamp createdAt;
	private Timestamp updatedAt;
}