package com.example.involveU.controller;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.involveU.model.User;
import com.example.involveU.model.DBServices;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AdminController extends DBServices {
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/admin/addAdmin/$newAdmin")
    private ResponseEntity<String> addAdmin (@PathVariable("newAdmin") User newAdmin) {

        if (newAdmin.getIsAdmin() == 0) {return new ResponseEntity<>("User was not set as an admin", HttpStatus.BAD_REQUEST);}
        else {

            if( insertDBNewUser(newAdmin)  == 1) {return new ResponseEntity<>("User not created", HttpStatus.BAD_REQUEST);}
            else {return new ResponseEntity<>("Successfully Created", HttpStatus.OK);}

        }

    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/admin/assignNewAdvisor/{advisorID}/{clubID}")
    private ResponseEntity<String> assignNewAdvisor(@PathVariable("advisorID") int advisorID,@PathVariable("clubID") int clubID)
    {
        if(assignDBAdvisor(clubID, advisorID))
        {
            return new ResponseEntity<>("success", HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>("duplicate entry", HttpStatus.BAD_REQUEST);
        }


    }



}
