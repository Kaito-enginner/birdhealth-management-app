package com.example.birdhealth_management.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.birdhealth_management.entity.Contact;
import com.example.birdhealth_management.entity.User;
import com.example.birdhealth_management.security.UserDetailsImpl;
import com.example.birdhealth_management.service.ContactService;
import com.example.birdhealth_management.service.EmailService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/contactpage")
public class ContactPageController {
private final ContactService contactService;
private final EmailService emailService;
	
	public ContactPageController(ContactService contactService, EmailService emailService) {
		this.contactService = contactService;
		this.emailService = emailService;
	}
	
	@PostMapping
	public ResponseEntity<String> contactRegister(@AuthenticationPrincipal UserDetailsImpl userDetails, @RequestBody Contact contact) {
		User loginUser = userDetails.getUser();
		contactService.create(loginUser, contact);
		emailService.sendContactMail(contact.getEmail(), contact.getContent());
		return ResponseEntity.ok("お問い合わせを受け付けました。");
	}
}
