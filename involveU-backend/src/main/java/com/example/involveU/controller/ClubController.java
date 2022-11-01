package com.example.involveU.controller;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.example.involveU.model.Club;
import com.example.involveU.model.DBServices;
import com.example.involveU.model.User;
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

     repsonse = insertNewClub(newClub);

       if(repsonse.equals("error") == true){return new ResponseEntity<>("Could not insert Club", HttpStatus.BAD_REQUEST);}
       else {return new ResponseEntity<>("Club has been successfully inserted", HttpStatus.OK);}

  }
  @CrossOrigin(origins = "http://localhost:4200")
  @GetMapping("/club/searchClubs/{searchContent}")
   private ResponseEntity<List<Club>> searchClub(@PathVariable("searchContent") String searchContent )
  {
          clubs = searchDBClub(searchContent);
      return new ResponseEntity<>(clubs, HttpStatus.OK);
  }
 @CrossOrigin(origins = "http://localhost:4200")
 @GetMapping("/club/getTopFavorite")
 private ResponseEntity<List<Club>> getTopFavorite()
 {
     Map<String, Object> tempPosition;
     List<Map<String,Object>> favoritesList;
     List<Club> sortedFavoriteClubs = new ArrayList<>();
     Club currentClub;
     favoritesList = getMostFavoriteClubs();
      for(int i = 0; i < favoritesList.size(); i++)
      {
         int currentValue = Integer.parseInt(favoritesList.get(i).get("total").toString());
          for(int j = 0; j < favoritesList.size(); j++)
          {
              int checkValue =  Integer.parseInt(favoritesList.get(j).get("total").toString());
              if( currentValue > checkValue )
              {
                tempPosition = favoritesList.get(i);
                favoritesList.set(i, favoritesList.get(j));
                favoritesList.set(j,tempPosition);

              }
          }
      }

      for(int i = 0; i < favoritesList.size(); i++)
      {
           currentClub = getSpecficClub(Integer.parseInt(favoritesList.get(i).get("clubID").toString()));

          sortedFavoriteClubs.add(currentClub);
      }
     return new ResponseEntity<>(sortedFavoriteClubs, HttpStatus.OK) ;
 }
@CrossOrigin(origins = "http://localhost:4200")
@GetMapping("/club/submitFavorite/{ID}/{clubID}")
 private ResponseEntity<String> submitFavorite(@PathVariable("ID") int userID, @PathVariable("clubID") int clubID)
 {
     
         return new ResponseEntity<>(submitDBFavorite(userID,clubID), HttpStatus.OK) ;
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
private ResponseEntity<User> getClubAdvisor (@PathVariable("clubID") int clubID)
{
 User tempUser = new User();

 tempUser = getDBClubAdvisor(clubID);
 return new ResponseEntity<>(tempUser, HttpStatus.OK);
}

}








