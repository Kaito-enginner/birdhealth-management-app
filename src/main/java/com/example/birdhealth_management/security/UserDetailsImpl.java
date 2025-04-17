package com.example.birdhealth_management.security;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.birdhealth_management.entity.User;

public class UserDetailsImpl implements UserDetails {
	private final User user;

	public UserDetailsImpl(User user) {
		this.user = user;
	}

	public User getUser() {
		return user;
	}

	//ハッシュ化済みのパスワードを返す
	@Override
	public String getPassword() {
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		return user.getEmail();
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return Collections.emptyList(); // ロールがない場合でもこう返す
	}

	// アカウントが期限切れでなければtrueを返す
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	// ユーザーがロックされていなければtrueを返す
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	// ユーザーのパスワードが期限切れでなければtrueを返す
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	// ユーザーが有効であればtrueを返す
	@Override
	public boolean isEnabled() {
		return true;
	}
}
