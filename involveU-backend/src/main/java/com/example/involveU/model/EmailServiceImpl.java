package com.example.involveU.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

// Annotation
@Service
// Class
// Implementing EmailService interface
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void sendEmail(String recipient, int securityCode) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom("involveUSNHU@gmail.com");
        simpleMailMessage.setTo(recipient);
        simpleMailMessage.setSubject("involveU Forgot Password");
        simpleMailMessage.setText("Hello user! Here is your verification code for your account: " + securityCode);
        mailSender.send(simpleMailMessage);
        System.out.println("Mail Sent...");
    }
}