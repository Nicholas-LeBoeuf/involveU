package com.example.involveU.controller;
import com.example.involveU.model.S3Util;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.involveU.model.User;
import com.example.involveU.model.DBServices;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.example.involveU.model.Image;
import org.springframework.web.multipart.commons.CommonsMultipartFile;


import java.io.*;
import java.util.List;

@RestController
@RequestMapping("/api")
public class AdminController extends DBServices {
   
    @PostMapping("/admin/addAdmin/{newAdmin}")
    private ResponseEntity<String> addAdmin (@PathVariable("newAdmin") User newAdmin) {

        if (newAdmin.getIsAdmin() == 0) {return new ResponseEntity<>("User was not set as an admin", HttpStatus.BAD_REQUEST);}
        else {

            if( insertDBNewUser(newAdmin)  == 1) {return new ResponseEntity<>("User not created", HttpStatus.BAD_REQUEST);}
            else {return new ResponseEntity<>("Successfully Created", HttpStatus.OK);}

        }

    }
 
    @GetMapping("/admin/assignNewAdvisor/{advisorID}/{clubID}")
    private ResponseEntity<String> assignNewAdvisor(@PathVariable("advisorID") int advisorID,@PathVariable("clubID") int clubID)
    {
        if(assignDBAdvisor(advisorID, clubID))
        {
            return new ResponseEntity<>("success", HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>("duplicate entry", HttpStatus.BAD_REQUEST);
        }
    }
   
   @GetMapping("/admin/addNewEboard/{userID}/{clubID}/{role}")
    private ResponseEntity<String> addNewEboard(@PathVariable("userID") int userID, @PathVariable("clubID") int clubID,@PathVariable("role") String position)
    {
        addDBEboardMember(userID, clubID,position);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }
   
    @GetMapping("/admin/deleteUser/{userID}")
    private ResponseEntity<String> deleteUser(@PathVariable("userID") int userID)
    {
        deleteDBUser(userID);
        return new ResponseEntity<>("user is deleted", HttpStatus.OK);
    }
    
    @PostMapping("/admin/createUser")
    private ResponseEntity<String>createUser(@RequestBody User newUser)
    {

            insertDBNewUser(newUser);
        return new ResponseEntity<>("added user successfully", HttpStatus.OK);
    }
    
    @GetMapping("/admin/deleteEboard/{userID}")
    private ResponseEntity<String>deleteEboard(@PathVariable("userID") int userID )
    {

        deleteDBEboardMember(userID);
        return new ResponseEntity<>("Deleted Eboard Memeber successfully", HttpStatus.OK);
    }
    
    @GetMapping("admin/getAllAdvisors")
    public ResponseEntity<List<User>> getAllAdvisors()
    {
        List<User> users = getDBAllAdmins();
        return new ResponseEntity<>(users,HttpStatus.OK	);

    }
    
    @GetMapping("admin/getNonAdvisors")
    public ResponseEntity<List<User>> getNoneAdvisors()
    {
        List<User> users = getDBNoneAdmins();
        return new ResponseEntity<>(users,HttpStatus.OK	);

    }
    
    @GetMapping("admin/getAllEboard")
    public ResponseEntity<List<User>> getAllEboard()
    {
        List<User> users = getDBAllEboard();
        return new ResponseEntity<>(users,HttpStatus.OK	);
    }
    
    @GetMapping("admin/getNonEboard")
    public ResponseEntity<List<User>> getNonEboard()
    {
        List<User> users = getDBNonEboard();
        return new ResponseEntity<>(users,HttpStatus.OK	);
    }
    
    @PostMapping("admin/testImage")
    public ResponseEntity<String> testImage(@RequestParam("file") MultipartFile newImage) throws IOException {

        S3Util s3 = new S3Util();
        String filename = newImage.getOriginalFilename();
        System.out.println(filename);

        s3.uploadFile(filename, newImage.getInputStream());

        return new ResponseEntity<>("Success",HttpStatus.OK	);
    }






}


