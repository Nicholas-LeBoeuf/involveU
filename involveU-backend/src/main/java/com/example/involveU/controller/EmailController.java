package com.example.involveU.controller;

import com.example.involveU.model.EmailService;
import com.example.involveU.model.EmailDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

// Annotation
@RestController
@RequestMapping(value = "/api", method = { RequestMethod.POST, RequestMethod.GET })
// Class
public class EmailController {

    @Autowired private EmailService emailService;

    // Sending a simple Email
    @PostMapping("/email/sendMail")
    public String
    sendMail(@RequestBody EmailDetails details)
    {
        String status = emailService.sendSimpleMail(details);

        return status;
    }
}