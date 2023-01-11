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
    Boolean validQuery = false;
   @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/annnouncements/getAllAnnouncements")
    private ResponseEntity<List<Announcement>> getAllAnnouncements()
    {
        announcements = getAllDBAnnouncements();

        return new ResponseEntity(announcements,HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/announcements/createAnnouncements")
    private ResponseEntity<String> createAnnouncement(@RequestBody Announcement newAnounncement)
    {
        validQuery = createDBAnnouncement(newAnounncement);

        if (validQuery)
        {
            return new ResponseEntity<>("success", HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>("error", HttpStatus.BAD_REQUEST);
        }

    }


}
