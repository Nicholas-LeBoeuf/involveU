package com.example.involveU.controller;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import com.example.involveU.model.Events;
import com.example.involveU.model.Club;
import com.example.involveU.model.RSVP;
import com.example.involveU.model.DBServices;
import com.example.involveU.model.EBoard;
import com.example.involveU.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
 @RestController
@RequestMapping("/api")
public class ClubController extends DBServices{
  private List<Club>  clubs;
  private List<EBoard> EboardList;
  private Club currentClub;
  private String repsonse;

  @CrossOrigin(origins = "http://localhost:4200")
  @GetMapping("/clubs")
  private List<Club> getAllClubs()
    {
        clubs = getAllDBClubs();

        return clubs;
    }
  @CrossOrigin(origins = "http://localhost:4200")
  @GetMapping("/club/{id}")
  private ResponseEntity<Object> getSpecificClub(@PathVariable("id") int clubID)
  {
    currentClub =  getSpecficClub(clubID);

    if(currentClub == null)
    {
        return new ResponseEntity<>("Club Does not exist", HttpStatus.BAD_REQUEST);
    }
    else
    {
     return new ResponseEntity<>( currentClub, HttpStatus.OK);
    }
        
  
  }
  @CrossOrigin(origins = "http://localhost:4200")
  @PostMapping ("/club/insertClub")
  private ResponseEntity<String> insertClub(@RequestBody Club newClub)
  {
         if(insertNewClub(newClub))
             return new ResponseEntity<>("Club has been successfully inserted", HttpStatus.OK);
         else
             return new ResponseEntity<>("Could not insert Club", HttpStatus.BAD_REQUEST);
  }
  @CrossOrigin(origins = "http://localhost:4200")
  @GetMapping("/club/searchClubs/{searchContent}")
   private ResponseEntity<List<Club>> searchClub(@PathVariable("searchContent") String searchContent )
  {
          clubs = searchDBClub(searchContent);
      return new ResponseEntity<>(clubs, HttpStatus.OK);
  }
 @CrossOrigin(origins = "http://localhost:4200")
 @GetMapping("/club/getTopRSVP")
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
@CrossOrigin(origins = "http://localhost:4200")
@GetMapping("/club/submitFavorite/{ID}/{clubID}")
 private ResponseEntity<String> submitFavorite(@PathVariable("ID") int userID, @PathVariable("clubID") int clubID)
 {

     if(submitDBFavorite(userID,clubID))
         return new ResponseEntity<>( "success", HttpStatus.OK) ;
     else
         return new ResponseEntity<>( "error", HttpStatus.BAD_REQUEST) ;
 }

@CrossOrigin(origins ="http://localhost:4200")
@GetMapping("/club/getUserFavorites/{ID}")
private ResponseEntity<List<Club>> getUserFavorites(@PathVariable("ID") int ID) {

       clubs = getDBUserFavorites(ID);

      return new ResponseEntity<>(clubs,HttpStatus.OK);
}

@CrossOrigin(origins = "http://localhost:4200")
@GetMapping("/club/removeFavorites/{clubID}/{id}")
private ResponseEntity<String> removeFavorite(@PathVariable("clubID") int clubID, @PathVariable("id") int userID)
{
    Boolean isValid;

  isValid = removeDBFavorite(clubID, userID);
  if(isValid == true)
  {
      return new ResponseEntity<>("success", HttpStatus.OK);
  }
  else{

      return new ResponseEntity<>("Failed", HttpStatus.BAD_REQUEST);
  }

}
@CrossOrigin(origins = "http://localhost:4200")
@GetMapping("/club/getClubAdvisor/{clubID}")
private ResponseEntity<Object> getClubAdvisor (@PathVariable("clubID") int clubID)
{
     User tempUser = new User();

     tempUser = getDBClubAdvisor(clubID);
     return new ResponseEntity<>(tempUser, HttpStatus.OK);
}
 @CrossOrigin(origins = "http://localhost:4200")
 @GetMapping("/club/getNonFavoritedClubs/{userID}")
 private ResponseEntity<List<Club>> getNonFavoritedClubs(@PathVariable("userID") int userID)
 {

     return new ResponseEntity<>(clubs, HttpStatus.OK);
 }
     @CrossOrigin(origins = "http://localhost:4200")
     @GetMapping("/club/getClubsEboard/{clubID}")
     private ResponseEntity<List<EBoard>> getClubEbaord(@PathVariable("clubID") int clubID)
     {
         EboardList = getDBClubEboardMembers(clubID);
         return new ResponseEntity<>(EboardList,HttpStatus.OK);
     }
}








