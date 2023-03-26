package com.example.involveU.controller;

import com.example.involveU.model.EmailService;
import com.example.involveU.model.EmailDetails;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

// Annotation
@RestController
@RequestMapping(value = "api/", method = { RequestMethod.POST, RequestMethod.GET })
// Class
public class EmailController {

    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    // Sending a simple Email

}