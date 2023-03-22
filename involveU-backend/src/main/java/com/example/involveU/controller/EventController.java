package com.example.involveU.controller;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.example.involveU.model.DBServices;
import com.example.involveU.model.Events;
import com.example.involveU.model.Space;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("api/")
public class EventController extends DBServices{
    List<Events> events;
    List<Space> spaces;

    @GetMapping("events/getEvents")
    private ResponseEntity<List<Events>> getsEvents()
    {
        events = getDBEvents();
        return new ResponseEntity<>(events, HttpStatus.OK);
    }

    @GetMapping("events/getTodaysEvents")
    private ResponseEntity<List<Events>> getTodaysEvents()
    {
       events = getDBTodaysEvents();
        return new ResponseEntity<>(events, HttpStatus.OK);
    }
    @GetMapping("events/getClubEvents/{clubID}")
    private ResponseEntity<List<Events>> getEventsByClub(@PathVariable("clubID") int clubID)
    {
        events = getDBClubEvents(clubID);

        return new ResponseEntity<>(events, HttpStatus.OK);
    }
    @GetMapping("events/getFutureEvents")
    private ResponseEntity<List<Events>> getFutureEvents()
    {
        events = getDBAllFutureEvents();

        return new ResponseEntity<>(events, HttpStatus.OK);
    }
    @GetMapping("events/getFutureFavoriteClubEvents/{userID}")
    private ResponseEntity<List<Events>> getFutureFavoriteClubEvents(@PathVariable("userID") int userID)
    {
        events = getDBFutureFavoriteClubEvents(userID);

        return new ResponseEntity<>(events, HttpStatus.OK);
    }
    @GetMapping("events/getFavoriteClubEvents/{userID}")
    private ResponseEntity<List<Events>> getFavoriteClubEvents(@PathVariable("userID") int userID)
    {
        events = getDBFavoriteClubEvents(userID);

        return new ResponseEntity<>(events, HttpStatus.OK);
    }


    @GetMapping("/events/getTopRSVP")
    private ResponseEntity<List<Events>> getTopFavorite()
    {
        Map<String, Object> tempPosition;
        List<Map<String,Object>> rsvpList;
        List<Events> sortedRSVPEvents = new ArrayList<>();
        Events currentEvent;
        rsvpList = getMostRSVPEvents();
        for(int i = 0; i < rsvpList.size(); i++)
        {
            int currentValue = Integer.parseInt(rsvpList.get(i).get("total").toString());
            for(int j = 0; j < rsvpList.size(); j++)
            {
                int checkValue =  Integer.parseInt(rsvpList.get(j).get("total").toString());
                if( currentValue > checkValue )
                {
                    tempPosition = rsvpList.get(i);
                    rsvpList.set(i, rsvpList.get(j));
                    rsvpList.set(j,tempPosition);

                }
            }
        }

        for(int i = 0; i < rsvpList.size(); i++)
        {
            currentEvent = getEventByID(Integer.parseInt(rsvpList.get(i).get("eventID").toString()));

            sortedRSVPEvents.add(currentEvent);
        }
        return new ResponseEntity<>(sortedRSVPEvents, HttpStatus.OK) ;
    }

    @GetMapping("events/rsvpEvent/{eventID}/{userID}")
    private ResponseEntity<String> rsvpEvnt(@PathVariable("eventID") int eventID, @PathVariable("userID") int userID)
    {
        if(insertRsvpEvent(eventID, userID))
            return new ResponseEntity<>("Success", HttpStatus.OK);
        else
            return new ResponseEntity<>("Failed", HttpStatus.BAD_REQUEST);
    }

    @GetMapping("events/removeRsvpEvent/{eventID}/{userID}")
    private ResponseEntity<String> removeRsvp(@PathVariable("eventID") int eventID, @PathVariable("userID") int userID)
    {
        removeDBRsvp(userID,eventID);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

        @GetMapping("events/getUserRsvpEvent/{userID}")
    private  ResponseEntity<List<Events>> getUserRsvpEvents(@PathVariable("userID") int userID)
    {
        events = getAllUserRsvp(userID);

        return new ResponseEntity<>(events, HttpStatus.OK);
    }

    @GetMapping("events/getClubRsvpEvent/{clubID}")
    private  ResponseEntity<List<Events>> getClubRsvpEvents(@PathVariable("clubID") int clubID)
    {
        events = getAllClubRsvp(clubID);

        return new ResponseEntity<>(events, HttpStatus.OK);
    }


    @PostMapping("events/createNewEvent")
    private ResponseEntity<String> createNewEvent(@RequestBody Events newEvent)
    {

            if (insertNewEvent(newEvent)) {
                return new ResponseEntity<>("success", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Missing Required Data", HttpStatus.NOT_ACCEPTABLE);
            }


    }

    @GetMapping("events/getAllEvents")
    private ResponseEntity<List<Events>> getAllCalendarEvents()
    {
          events =  getAllEvents();
        return new ResponseEntity<>(events, HttpStatus.OK);
    }

    @GetMapping("events/deleteEvent/{eventID}")
    private ResponseEntity<String> deleteEvent(@PathVariable("eventID") int eventID)
    {

          if(removeDBEvent(eventID))
          {
              return new ResponseEntity<>("success", HttpStatus.OK);
          }
          else
          {
              return new ResponseEntity<>("error", HttpStatus.BAD_REQUEST);
          }

    }

    @PostMapping("events/updateEvents")
    private ResponseEntity<String> updateEvents(@RequestBody Events eventToUpdate )
    {
        updateDBEvent(eventToUpdate);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }
    @CrossOrigin (origins = "http://localhost:4200")
        @GetMapping("events/getSpecificEvent/{eventID}")
    private ResponseEntity<Events> getSpecificEvent(@PathVariable("eventID") int eventID)
    {
        Events event;
        event = getEventByID(eventID);

        return new ResponseEntity<>(event, HttpStatus.OK);
    }
    @GetMapping("events/test25live/{clubID}")
    private  ResponseEntity<String> get25liveEvents(@PathVariable("clubID") int clubID) throws IOException, ParseException {


        String url = "https://25livepub.collegenet.com/calendars/snhu-all-campus-events-calendar.json";
        RestTemplate restTemplate = new RestTemplate();
        Events [] events = restTemplate.getForObject(url,Events[].class);

        upload25liveEvents(events);


//        HttpEntity<CreateTaskInput> request = new HttpEntity<>(headers);
//        String url = generateUrl("/tasks");
//
//        ResponseEntity<TaskItemResponse[]> result = restTemplate.exchange(url, HttpMethod.GET, request, TaskItemResponse[].class);
//        TaskItemResponse[] tasks = result.getBody();
//
//        assert tasks != null;

        return new ResponseEntity<>("success", HttpStatus.OK);


    }

}



