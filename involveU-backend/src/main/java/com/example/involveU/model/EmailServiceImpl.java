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
    private JavaMailSender mailSender;      //MailKit we use to send emails

    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }
    //We send emails when users create an account or if they forget their password. We set the email and password of
    //our account in the application.properties file so the mail kit can access our gmail.
    //WARNING: IF TESTING ON LOCALHOST MAKE SURE TO USE HOTSPOT OR NOT BE ON SNHU WI-FI SINCE SNHU WI-FI BLOCKS THE MAIL KIT
    @Override
    public void sendEmail(String recipient, int securityCode) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom("involveUSNHU@gmail.com");
        simpleMailMessage.setTo(recipient);
        simpleMailMessage.setSubject("involveU Forgot Password");
        simpleMailMessage.setText("Hello user! Here is your verification code for your account: " + securityCode);
        mailSender.send(simpleMailMessage);
    }

    public void sendWelcomeEmail(String recipient, int securityCode) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom("involveUSNHU@gmail.com");
        simpleMailMessage.setTo(recipient);
        simpleMailMessage.setSubject("Welcome to involveU!");
        simpleMailMessage.setText("Hello user! Welcome to involveU! Here is your verification code to finish creating your account: " + securityCode);
        mailSender.send(simpleMailMessage);
    }
}