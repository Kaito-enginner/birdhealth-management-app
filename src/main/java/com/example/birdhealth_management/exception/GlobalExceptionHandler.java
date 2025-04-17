package com.example.birdhealth_management.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(EmailAlreadyExistsException.class)
	public ResponseEntity<String> handleEmailExists(EmailAlreadyExistsException ex) {
		return ResponseEntity
				.badRequest()
				.body(ex.getMessage()); // ← "このメールアドレスは既に使用されています。"
	}
}
