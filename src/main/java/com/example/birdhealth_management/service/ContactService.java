package com.example.birdhealth_management.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.birdhealth_management.dto.ContactDto;
import com.example.birdhealth_management.dto.UserContactDto;
import com.example.birdhealth_management.entity.Contact;
import com.example.birdhealth_management.entity.User;
import com.example.birdhealth_management.repository.ContactRepository;

@Service
public class ContactService {
	private final ContactRepository contactRepository;

	public ContactService(ContactRepository contactRepository) {
		this.contactRepository = contactRepository;
	}

	@Transactional
	public void create(User user, Contact contact) {
		Contact newContact = new Contact();
		newContact.setUserId(user);
		newContact.setEmail(contact.getEmail());
		newContact.setContent(contact.getContent());
		newContact.setStatus(false);
		contactRepository.save(newContact);
	}
	
	@Transactional
	public void update(List<Integer> id) {
		for(int i = 0; i < id.size(); i++) {
			Contact contacat = contactRepository.getReferenceById(id.get(i));
			
			contacat.setStatus(true);
			contactRepository.save(contacat);
		}
	}

	//Contact→ContactDtoに変換
	public List<UserContactDto> convertToDto(List<Contact> contacts) {
		List<UserContactDto> userContactDtos = new ArrayList<UserContactDto>();
		
		for (int i = 0; i < contacts.size(); i++) {
			Contact contact = contacts.get(i);
			ContactDto contactDto = new ContactDto();
			
			contactDto.setId(contact.getId());
			contactDto.setEmail(contact.getEmail());
			contactDto.setContent(contact.getContent());
			contactDto.setStatus(contact.getStatus());
			contactDto.setCreatedAt(contact.getCreatedAt());
			contactDto.setUpdatedAt(contact.getUpdatedAt());
			
			UserContactDto userContactDto = new UserContactDto(contactDto, contact.getUserId().getId(), contact.getUserId().getName(), contact.getUserId().getEmail());
			
			userContactDtos.add(userContactDto);
		}
		
		return userContactDtos;
	}
}
