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
   @CrossOrigin(origins = "http://localhost:4200")
   @GetMapping("/admin/addNewEboard/{userID}/{clubID}/{role}")
    private ResponseEntity<String> addNewEboard(@PathVariable("userID") int userID, @PathVariable("clubID") int clubID,@PathVariable("role") String position)
    {
        addDBEboardMember(userID, clubID,position);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/admin/deleteUser/{userID}")
    private ResponseEntity<String> deleteUser(@PathVariable("userID") int userID)
    {
        deleteDBUser(userID);
        return new ResponseEntity<>("user is deleted", HttpStatus.OK);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/admin/createUser/")
    private ResponseEntity<String>createUser(@RequestBody User newUser)
    {

            insertDBNewUser(newUser);
        return new ResponseEntity<>("added user successfully", HttpStatus.OK);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/admin/deleteEboard/{userID}")
    private ResponseEntity<String>deleteEboard(@PathVariable("userID") int userID )
    {

        deleteEboard(userID);
        return new ResponseEntity<>("added user successfully", HttpStatus.OK);
    }
}


