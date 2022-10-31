package com.example.involveU.controller;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.involveU.model.User;
import com.example.involveU.model.DBServices;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AdvisorController extends DBServices {
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/admin/addAdmin/$newAdmin")
    private ResponseEntity<String> addAdmin (@PathVariable("newAdmin") User newAdmin) {

        if (newAdmin.getIsAdmin() == 0) {return new ResponseEntity<>("User was not set as an admin", HttpStatus.BAD_REQUEST);}
        else {

            if( insertDBNewUser(newAdmin)  == 1) {return new ResponseEntity<>("User not created", HttpStatus.BAD_REQUEST);}
            else {return new ResponseEntity<>("Successfully Created", HttpStatus.OK);}

        }

    }




}
