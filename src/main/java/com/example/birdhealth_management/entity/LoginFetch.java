package com.example.birdhealth_management.entity;

import jakarta.persistence.Column;

import lombok.Data;

@Data
public class LoginFetch {

  @Column(name = "email")
  private String email;
      
  @Column(name = "password")
  private String password;    
}
