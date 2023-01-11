package com.example.involveU.controller;
import java.util.List;

import com.example.involveU.model.Announcement;
import com.example.involveU.model.DBServices;
import com.example.involveU.model.Events;
import com.example.involveU.model.Space;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
public class AnnouncementsController extends DBServices {
    List<Announcement>  announcements;

   @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/annnouncements/getAllAnnouncements")
    private ResponseEntity<List<Announcement>> getAllAnnouncements()
    {
        announcements = getAllDBAnnouncements();

        return new ResponseEntity(announcements,HttpStatus.OK);
    }

}
