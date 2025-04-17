package com.example.birdhealth_management.service;

import java.util.Objects;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.birdhealth_management.entity.User;
import com.example.birdhealth_management.exception.EmailAlreadyExistsException;
import com.example.birdhealth_management.repository.UserRepository;

@Service
public class UserService {
	private final UserRepository userRepository;
	private PasswordEncoder passwordEncoder;

	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	@Transactional
	public void create(User userData) {
		User newUser = new User();
		
		emailDuplicateCheck(userData.getEmail());
		
		newUser.setName(userData.getName());
		newUser.setAge(userData.getAge());
		newUser.setEmail(userData.getEmail());
		newUser.setPassword(encryptPassword(userData.getPassword()));

		userRepository.save(newUser);
	}

	@Transactional
	public void update(Integer id, User userData) {
		User updateUser = userRepository.getReferenceById(id);
		
		emailDuplicateCheck(userData.getEmail());
		
		updateUser.setName(userData.getName());
		updateUser.setAge(userData.getAge());
		updateUser.setEmail(userData.getEmail());
		updateUser.setPassword(encryptPassword(userData.getPassword()));

		userRepository.save(updateUser);
	}

	// 同じメールアドレスが登録されていないか確認する。
	public void emailDuplicateCheck(String email) {
		User user = userRepository.findByEmail(email);
		if(Objects.nonNull(user)) {
			throw new EmailAlreadyExistsException("このメールアドレスは既に使用されています。");
		}
	}

	// パスワードを暗号化する
	public String encryptPassword(String password) {
		String encodedPassword = passwordEncoder.encode(password);
		return encodedPassword;
	}
}
