package com.example.birdhealth_management.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

	@Autowired
	private JavaMailSender mailSender;

	public void sendContactMail(String email, String content) {
		SimpleMailMessage message = new SimpleMailMessage();
		
		String subject = "お問い合わせが届きました。";
		String text = "お問い合わせの内容を確認して対応してください。";

		message.setFrom("hatopegu@fuwari.be");
		message.setTo(email);
		message.setSubject(subject);
		message.setText(text + "\n" + email + "\n" + "お問い合わせ内容：" + content);
		mailSender.send(message);
	}
	
	public void sendResetMail(String email, String token) {
		SimpleMailMessage message = new SimpleMailMessage();
		
		String subject = "仮パスワードを発行しました。";
		String text = "下記のパスワードを用いてログインし、直ちにパスワードの再設定をお願いいたします。";

		message.setFrom("hatopegu@fuwari.be");
		message.setTo(email);
		message.setSubject(subject);
		message.setText(text + "\n" + "パスワード：" + token);
		mailSender.send(message);
	}
}
