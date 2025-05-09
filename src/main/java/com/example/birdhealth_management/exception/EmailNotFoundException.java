package com.example.birdhealth_management.exception;

public class EmailNotFoundException extends IllegalArgumentException {
	public EmailNotFoundException(String message) {
		super(message);
	}
}
