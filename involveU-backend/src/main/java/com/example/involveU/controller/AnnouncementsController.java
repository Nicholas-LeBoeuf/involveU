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

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/announcements/deleteAnnouncement/{announcementID}")
    private ResponseEntity<String> deleteAnnouncement(@PathVariable("announcementID") int announcementID)
    {
        validQuery = deleteDBAnnouncement(announcementID);

        if(validQuery)
        {
            return new ResponseEntity<>( "succes", HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>( "error", HttpStatus.BAD_REQUEST);
        }

    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/announcements/editAnnouncements")
    private ResponseEntity<String> editAnnouncement(@RequestBody Announcement anounncementToEdit)
    {
        validQuery = editDBAnnouncement(anounncementToEdit);

        if (validQuery)
        {
            return new ResponseEntity<>("success", HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>("error", HttpStatus.BAD_REQUEST);
        }

    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/announcements/getFavoritedAnnouncements/{userID}")
    private ResponseEntity<List<Announcement>> getFavoritedAnnouncements(@PathVariable("userID") int userID)
    {
        announcements = getDBFavoritedAnnouncements(userID);

        return new ResponseEntity<>(announcements, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/announcements/getClubAnnouncements/{clubID}")
    private ResponseEntity<List<Announcement>> getClubAnnouncements(@PathVariable("clubID") int clubID)
    {
        announcements = getDBClubAnnouncements(clubID);

        return new ResponseEntity<>(announcements, HttpStatus.OK);
    }

}
