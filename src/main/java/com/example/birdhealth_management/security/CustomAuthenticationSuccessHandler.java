package com.example.birdhealth_management.security;

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {

		// ログインしたユーザー情報を取得
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		String roleName = userDetails.getUser().getRole().getName();
		
		response.setContentType("application/json");
    response.setCharacterEncoding("UTF-8");
    String jsonResponse = String.format("{\"role\": \"%s\"}", roleName);
    response.getWriter().write(jsonResponse);
    response.setStatus(HttpServletResponse.SC_OK);
	}

}