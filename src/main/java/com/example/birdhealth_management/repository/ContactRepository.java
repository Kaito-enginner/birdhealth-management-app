package com.example.birdhealth_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.birdhealth_management.entity.Contact;

public interface ContactRepository extends JpaRepository<Contact, Integer> {

}
