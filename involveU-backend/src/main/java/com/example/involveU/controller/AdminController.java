package com.example.involveU.controller;
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

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class AdminController extends DBServices {
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/admin/addAdmin/{newAdmin}")
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
        if(assignDBAdvisor(advisorID, clubID))
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
    @PostMapping("/admin/createUser")
    private ResponseEntity<String>createUser(@RequestBody User newUser)
    {

            insertDBNewUser(newUser);
        return new ResponseEntity<>("added user successfully", HttpStatus.OK);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/admin/deleteEboard/{userID}")
    private ResponseEntity<String>deleteEboard(@PathVariable("userID") int userID )
    {

        deleteDBEboardMember(userID);
        return new ResponseEntity<>("Deleted Eboard Memeber successfully", HttpStatus.OK);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("admin/getAllAdvisors")
    public ResponseEntity<List<User>> getAllAdvisors()
    {
        List<User> users = getDBAllAdmins();
        return new ResponseEntity<>(users,HttpStatus.OK	);

    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("admin/getNonAdvisors")
    public ResponseEntity<List<User>> getNoneAdvisors()
    {
        List<User> users = getDBNoneAdmins();
        return new ResponseEntity<>(users,HttpStatus.OK	);

    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("admin/getAllEboard")
    public ResponseEntity<List<User>> getAllEboard()
    {
        List<User> users = getDBAllEboard();
        return new ResponseEntity<>(users,HttpStatus.OK	);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("admin/getNonEboard")
    public ResponseEntity<List<User>> getNonEboard()
    {
        List<User> users = getDBNonEboard();
        return new ResponseEntity<>(users,HttpStatus.OK	);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("admin/testImage")
    public ResponseEntity<String> testImage(@RequestParam("file") MultipartFile newImage)
    {
        uploadImage(newImage);
        System.out.println(newImage);
        return new ResponseEntity<>("Success",HttpStatus.OK	);
    }
//    @CrossOrigin(origins = "http://localhost:4200")
//    @GetMapping("admin/getClubImage")
////    public ResponseEntity<String> testImage() throws SQLException, IOException {
////        Image clubFile;
////        clubFile = getDBClubFile();
////        Blob blob = clubFile.getImage();
////        InputStream is = blob.getBinaryStream(0, blob.length());
////        try (FileOutputStream fos = new FileOutputStream("./src/resources/tempFile.jpg")) {
////            fos.write(is.readAllBytes());
////            //fos.close(); There is no more need for this line since you had created the instance of "fos" inside the try. And this will automatically close the OutputStream
////        }
////        return new ResponseEntity<>("success",HttpStatus.OK	);
////
////    }






}


