package com.example.birdhealth_management.security;

import java.util.Arrays;
import java.util.List;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurityConfig {
	private final CustomAuthenticationSuccessHandler successHandler;
	private final CustomAuthenticationFailureHandler failureHandler;
	
	public WebSecurityConfig(CustomAuthenticationSuccessHandler successHandler, CustomAuthenticationFailureHandler failureHandler) {
		this.successHandler = successHandler;
		this.failureHandler= failureHandler;
	}
	
	@Value("${cors.allowed-origins:http://localhost:5173}")
  private String allowedOrigins;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		return http
				.csrf(csrf -> csrf.disable())
				.authorizeHttpRequests(auth -> auth
				    .requestMatchers("/", "/api/signup", "/api/reset", "/static/**", "/dist/**").permitAll()
						.requestMatchers("/admin/**").hasRole("ADMIN")
						.anyRequest().authenticated()
				)
				.formLogin(form -> form
						.loginPage("/")
						.loginProcessingUrl("/api/login")
						.successHandler(successHandler)
						.failureHandler(failureHandler)
						.permitAll()
				)
				.logout(logout -> logout
						.logoutUrl("/logout")
				    .logoutSuccessHandler((request, response, authentication) -> {
				        response.setStatus(HttpServletResponse.SC_OK);
				        response.setContentType("application/json");
				        response.getWriter().write("{\"message\": \"Logged out successfully\"}");
				    })
				    .permitAll()
				)
				.cors(cors -> cors.configurationSource(corsConfigurationSource()))
				.build();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList(allowedOrigins.split(",")));
		configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		configuration.setAllowedHeaders(List.of("*"));
		configuration.setAllowCredentials(true);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
