package com.example.birdhealth_management.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.birdhealth_management.dto.UserContactDto;
import com.example.birdhealth_management.entity.Contact;
import com.example.birdhealth_management.repository.ContactRepository;
import com.example.birdhealth_management.service.ContactService;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "https://birdhealth-management-app-ef0e3e571032.herokuapp.com"})
@RequestMapping("/adminhomepage")
public class AdminHomeController {
	private final ContactRepository contactRepository;
	private final ContactService contactService;



	public AdminHomeController(ContactRepository contactRepository, ContactService contactService) {
		this.contactRepository = contactRepository;
		this.contactService = contactService;
	}

	@GetMapping
	public List<UserContactDto> getContactPageData() {
		List<Contact> contacts = contactRepository.findAll();
		List<UserContactDto> contactDtos = contactService.convertToDto(contacts);
		
		return contactDtos;
	}
	
	@PostMapping("/complete")
	public void changeStatusToCompleted(@RequestBody List<Integer> id) {
		contactService.update(id);
	}
}
