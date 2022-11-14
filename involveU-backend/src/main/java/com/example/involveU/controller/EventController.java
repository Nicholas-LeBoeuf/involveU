package com.example.involveU.controller;
import java.awt.image.RescaleOp;
import java.io.IOException;
import java.util.List;
import com.example.involveU.model.DBServices;
import com.example.involveU.repository.UserRepository;
import com.example.involveU.model.Events;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/")
public class EventController extends DBServices{
    List<Events> events;
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("events/getTodaysEvents")
    private ResponseEntity<List<Events>> getTodaysEvents()
    {
       events = getDBTodaysEvents();
        return new ResponseEntity<>(events, HttpStatus.OK);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("events/getClubEvents/{clubID}")
    private ResponseEntity<List<Events>> getEventsByClub(@PathVariable("clubID") int clubID)
    {
        events = getDBClubEvents(clubID);

        return new ResponseEntity<>(events, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("events/getFutureEvents")
    private ResponseEntity<List<Events>> getFutureEvents()
    {
        events = getDBAllFutureEvents();

        return new ResponseEntity<>(events, HttpStatus.OK);

    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("events/getFavoriteClubEvents/{userID}")
    private ResponseEntity<List<Events>> getFavoriteClubEvents(@PathVariable("userID") int userID)
    {
        events = getDBFavoriteClubEvents(userID);

        return new ResponseEntity<>(events, HttpStatus.OK);

    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("events/rsvpEvent/{eventID}/{userID}")
    private ResponseEntity<String> rsvpEvnt(@PathVariable("eventID") int eventID, @PathVariable("userID") int userID)
    {
        if(insertRsvpEvent(eventID, userID))
            return new ResponseEntity<>("Success", HttpStatus.OK);
        else
            return new ResponseEntity<>("Failed", HttpStatus.BAD_REQUEST);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("events/removeRsvpEvent/{eventID}/{userID}")
    private ResponseEntity<String> removeRsvp(@PathVariable("eventID") int eventID, @PathVariable("userID") int userID)
    {
        removeDBRsvp(userID,eventID);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

}



