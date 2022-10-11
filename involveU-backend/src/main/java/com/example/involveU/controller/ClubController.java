package com.example.involveU.controller;
import java.util.List;
import com.example.involveU.model.Club;
import com.example.involveU.model.DBServices;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
 @RestController
@RequestMapping("/api")
public class ClubController extends DBServices{
  private List<Club>  clubs;
  private Club currentClub;
  private String repsonse;

  @GetMapping("/clubs")
  private List<Club> getAllClubs()
    {
        clubs = getAllDBClubs();

        return clubs;
    }

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

  @GetMapping ("/club/insertClub/{newClub}")
  private ResponseEntity<String> insertClub(@PathVariable("newClub") Club newClub)
  {

     repsonse = insertNewClub(newClub);

       if(repsonse.equals("error") == true){return new ResponseEntity<>("Could not insert Club", HttpStatus.BAD_REQUEST);}
       else {return new ResponseEntity<>("Club has been successfully inserted", HttpStatus.OK);}

  }

  @GetMapping("/club/serachClubs/{searchContent}")
   private ResponseEntity<List<Club>> searchClub(@PathVariable("searchContent") String searchContent )
  {

      return new ResponseEntity<>(clubs, HttpStatus.OK);
  }






}
