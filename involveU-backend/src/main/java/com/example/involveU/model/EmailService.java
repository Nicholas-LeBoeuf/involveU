package com.example.involveU.model;

import com.example.involveU.model.EmailDetails;

// Interface
public interface EmailService {

    void sendEmail(String recipient, int securityCode);
}