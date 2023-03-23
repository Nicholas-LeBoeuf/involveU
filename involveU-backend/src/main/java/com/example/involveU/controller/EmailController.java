package com.example.involveU.controller;

import com.example.involveU.model.EmailService;
import com.example.involveU.model.EmailDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.util.List;

// Annotation
@RestController
@RequestMapping(value = "/api", method = { RequestMethod.POST, RequestMethod.GET })
// Class
public class EmailController {

    @Autowired private EmailService emailService;

    // Sending a simple Email
    @PostMapping("/email/sendMail")
    public ResponseEntity<String> sendMail(@RequestBody EmailDetails details)
    {
        String status = emailService.sendSimpleMail(details);
        if(status != null)
        {
            return new ResponseEntity<>("success", HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>("error", HttpStatus.BAD_REQUEST);
        }
    }
}