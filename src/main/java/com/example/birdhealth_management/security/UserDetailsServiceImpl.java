package com.example.birdhealth_management.security;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.birdhealth_management.entity.User;
import com.example.birdhealth_management.repository.UserRepository;
import com.example.birdhealth_management.service.UserService;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	private final UserRepository userRepository;
	private final UserService userService;

	public UserDetailsServiceImpl(UserRepository userRepository, UserService userService) {
		this.userRepository = userRepository;
		this.userService = userService;
	}

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		try {
			User user = userRepository.findByEmail(email);
			if (user == null || user.getEnabled() == false) {
				throw new UsernameNotFoundException("ユーザーが見つかりませんでした。");
			}
			
			userService.loginDaysCountUp(user);
			String roleName = user.getRole().getName();
			Collection<GrantedAuthority> authorities = new ArrayList<>();
			authorities.add(new SimpleGrantedAuthority(roleName));
			return new UserDetailsImpl(user, authorities);
		} catch (Exception ex) {
			throw new UsernameNotFoundException("ユーザーが見つかりませんでした。");
		}
	}
}