package com.example.birdhealth_management.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.birdhealth_management.dto.PasswordResetRequestDto;
import com.example.birdhealth_management.dto.UserDto;
import com.example.birdhealth_management.entity.Role;
import com.example.birdhealth_management.entity.User;
import com.example.birdhealth_management.exception.EmailAlreadyExistsException;
import com.example.birdhealth_management.exception.EmailNotFoundException;
import com.example.birdhealth_management.exception.UserNotFoundException;
import com.example.birdhealth_management.repository.RoleRepository;
import com.example.birdhealth_management.repository.UserRepository;

@Service
public class UserService {
	private final UserRepository userRepository;
	private final RoleRepository roleRepository;
	private PasswordEncoder passwordEncoder;
	private final EmailService emailService;

	public UserService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder,
			EmailService emailService) {
		this.userRepository = userRepository;
		this.roleRepository = roleRepository;
		this.passwordEncoder = passwordEncoder;
		this.emailService = emailService;
	}

	@Transactional
	public void create(User user) {
		User newUser = new User();
		Role role = roleRepository.findByName("ROLE_GENERAL");

		emailDuplicateCheck(user.getEmail());

		newUser.setName(user.getName());
		newUser.setEmail(user.getEmail());
		newUser.setPassword(encryptPassword(user.getPassword()));
		newUser.setEnabled(true);
		newUser.setConsecutive_login_days(1);
		newUser.setRole(role);

		userRepository.save(newUser);
	}

	@Transactional
	public void update(User updateuser, User user) {
		emailDuplicateCheck(user.getEmail());

		updateuser.setName(user.getName());
		updateuser.setEmail(user.getEmail());

		userRepository.save(updateuser);
	}

	@Transactional
	public User disable(Integer id) throws UserNotFoundException {
		User user = userRepository.findById(id)
				.orElseThrow(() -> new UserNotFoundException("ユーザーが見つかりません。"));

		if (user.getEnabled()) {
			user.setEnabled(false);
		} else {
			user.setEnabled(true);
		}
		
		userRepository.save(user);
		return user;
	}

	@Transactional
	public void passwordUpdate(User updateuser, User user) {
		updateuser.setPassword(encryptPassword(user.getPassword()));

		userRepository.save(updateuser);
	}

	// 仮パスワード発行
	@Transactional
	public void passwordReset(PasswordResetRequestDto emailDto) {
		String email = emailDto.getEmail();
		User updateUser = userRepository.findByEmail(email);

		if (updateUser == null) {
			throw new EmailNotFoundException("該当のメールアドレスが見つかりません。");
		}

		String token = UUID.randomUUID().toString();

		updateUser.setPassword(encryptPassword(token));

		userRepository.save(updateUser);

		emailService.sendResetMail(email, token);
	}

	// 同じメールアドレスが登録されていないか確認する。
	public void emailDuplicateCheck(String email) {
		User user = userRepository.findByEmail(email);

		if (Objects.nonNull(user)) {
			throw new EmailAlreadyExistsException("このメールアドレスは既に使用されています。");
		}
	}

	// パスワードを暗号化する
	public String encryptPassword(String password) {
		String encodedPassword = passwordEncoder.encode(password);
		return encodedPassword;
	}

	// ログイン日数を増加する
	@Transactional
	public void loginDaysCountUp(User user) {
		LocalDate lastLoginDate = user.getUpdatedAt().toLocalDateTime().toLocalDate();
		LocalDate today = LocalDate.now();

		if (!today.equals(lastLoginDate)) {
			Integer loginDays = user.getConsecutive_login_days();
			Integer updatedLoginDays = loginDays + 1;

			user.setConsecutive_login_days(updatedLoginDays);
			userRepository.save(user);
		}
	}

	// User型→UserDtoに変換
	public List<UserDto> convertToDto(List<User> users) {
		List<UserDto> userDtos = new ArrayList<UserDto>();
		for (int i = 0; i < users.size(); i++) {
			User user = users.get(i);
			UserDto userDto = new UserDto();

			userDto.setId(user.getId());
			userDto.setName(user.getName());
			userDto.setEmail(user.getEmail());
			userDto.setEnabled(user.getEnabled());
			userDto.setConsecutive_login_days(user.getConsecutive_login_days());
			userDto.setCreatedAt(user.getCreatedAt());
			userDto.setUpdatedAt(user.getUpdatedAt());

			userDtos.add(userDto);

		}

		return userDtos;
	}
}
