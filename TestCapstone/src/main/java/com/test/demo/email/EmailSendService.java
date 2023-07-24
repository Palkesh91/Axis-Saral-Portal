package com.test.demo.email;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSendService {
	@Autowired
	private JavaMailSender mailSender;

	public void sendEmail(String fromEmail,String toEmail, String subject, String body) {

		SimpleMailMessage message = new SimpleMailMessage();
		//message.setFrom("");
		message.setFrom(fromEmail);
		message.setTo(toEmail);
		message.setText(body);
		message.setSubject(subject);
		System.out.println("sending start");

		mailSender.send(message);

		System.out.println("mail Sent ");

	}

}