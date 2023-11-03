package com.example.involveU.controller;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import com.example.involveU.model.*;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
@RestController
@RequestMapping("/api")
public class ClubController extends DBServices{
  private List<Club>  clubs;
  private List<EBoard> EboardList;
  private Club currentClub;
  private String repsonse;
  private List <SocialMedia> clubSMs;


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

  @DeleteMapping ("/club/deleteClub/{clubID}")
  private ResponseEntity<String> deleteClub(@PathVariable("clubID") int clubID)
  {
      if(deleteDBClub(clubID))
      {
          return new ResponseEntity<>("success", HttpStatus.OK);
      }
      else
      {
          return new ResponseEntity<>("error", HttpStatus.BAD_REQUEST);
      }

  }


  @PostMapping ("/club/insertClub")
  private ResponseEntity<String> insertClub(@RequestBody Club newClub)
  {
         if(insertNewClub(newClub))
             return new ResponseEntity<>("Club has been successfully inserted", HttpStatus.OK);
         else
             return new ResponseEntity<>("Could not insert Club", HttpStatus.BAD_REQUEST);
  }

  @PutMapping ("/club/updateClubData")
  private ResponseEntity<String> updateClubData(@RequestBody Club newClub)
    {
        if(updateClubDBData(newClub))
        {
            return new ResponseEntity<>("success", HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>("error", HttpStatus.BAD_REQUEST);
        }
    }
  @GetMapping("/club/searchClubs/{searchContent}")
   private ResponseEntity<List<Club>> searchClub(@PathVariable("searchContent") String searchContent )
  {
          clubs = searchDBClub(searchContent);
      return new ResponseEntity<>(clubs, HttpStatus.OK);
  }

@GetMapping("/club/submitFavorite/{ID}/{clubID}")
 private ResponseEntity<String> submitFavorite(@PathVariable("ID") int userID, @PathVariable("clubID") int clubID)
 {

     if(submitDBFavorite(userID,clubID))
         return new ResponseEntity<>( "success", HttpStatus.OK) ;
     else
         return new ResponseEntity<>( "error", HttpStatus.BAD_REQUEST) ;
 }


@GetMapping("/club/getUserFavorites/{ID}")
private ResponseEntity<List<Club>> getUserFavorites(@PathVariable("ID") int ID) {

       clubs = getDBUserFavorites(ID);

      return new ResponseEntity<>(clubs,HttpStatus.OK);
}


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

@GetMapping("/club/getClubAdvisor/{clubID}")
private ResponseEntity<Object> getClubAdvisor (@PathVariable("clubID") int clubID)
{
     User tempUser = new User();

     tempUser = getDBClubAdvisor(clubID);
     return new ResponseEntity<>(tempUser, HttpStatus.OK);
}

 @GetMapping("/club/getNonFavoritedClubs/{userID}")
 private ResponseEntity<List<Club>> getNonFavoritedClubs(@PathVariable("userID") int userID)
 {

     return new ResponseEntity<>(clubs, HttpStatus.OK);
 }

     @GetMapping("/club/getClubsEboard/{clubID}")
     private ResponseEntity<List<EBoard>> getClubEbaord(@PathVariable("clubID") int clubID)
     {
         EboardList = getDBClubEboardMembers(clubID);
         return new ResponseEntity<>(EboardList,HttpStatus.OK);
     }


     @GetMapping("/club/checkIfEboard/{userID}")
     private ResponseEntity<Object>  checkIfEboard(@PathVariable("userID") int userID) {
         Club eboardClub;
         if (checkIfClubEboard(userID)) {

             eboardClub = getEboardClub(userID);
             return new ResponseEntity<>(eboardClub, HttpStatus.OK);

         }
            return new ResponseEntity<>("not eboard", HttpStatus.OK);
     }


     @GetMapping("/club/getClubLogo/{clubID}")
     private ResponseEntity<byte[]> downloadImage(@PathVariable("clubID") int clubID) throws IOException {
      Club newClub = new Club();

      newClub = getSpecficClub(clubID);

        String fileName = getClubLogo(clubID);
        S3Util bucket = new S3Util("involveu-image");
         byte[] file = bucket.downloadFile(newClub.getClubName() + "/" + fileName);

         return new ResponseEntity<>(file,HttpStatus.OK);
     }

    @GetMapping("/club/getClubSocialMedia/{clubID}")
    private ResponseEntity<List<SocialMedia>> getSocialMedia(@PathVariable("clubID") int clubID)
    {
        clubSMs = getDBClubSocialMedia(clubID);
        return new ResponseEntity<>(clubSMs, HttpStatus.OK);
    }

    @DeleteMapping("/club/deleteClubSocialMedia/{socialMediaID}")
    private ResponseEntity<String> deleteSocialMedia(@PathVariable("socialMediaID") int smID)
    {
        if(deleteDBSocialMedia(smID))
        {
            return new ResponseEntity<>("success", HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>("error", HttpStatus.BAD_REQUEST);
        }

    }

    @PostMapping("/club/insertNewSocialMedia")
    private ResponseEntity<String> insertNewSocialMedia(@RequestBody SocialMedia newSM)
    {

        if(insertDBNewSocialMedia(newSM))
        {
            return new ResponseEntity<>("success", HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>("error", HttpStatus.BAD_REQUEST);        }

    }

    @PutMapping("/club/editSocialMedia")
    private ResponseEntity<String> editSocialMedia(@RequestBody SocialMedia newSM)
    {
        if(updateSocialMedia(newSM))
        {
            return new ResponseEntity<>("success", HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>("error", HttpStatus.BAD_REQUEST);
        }

    }
    @PostMapping("/club/CheckDBImageName/{fileName}/{clubID}")
    private ResponseEntity<String> changeClubImage(@PathVariable("fileName") String fileName, @PathVariable("clubID") int clubID) {


        if(checkDBImagePath(fileName, clubID))
        {
            return new ResponseEntity<>("file path found", HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>("file path not found", HttpStatus.OK);
        }

    }

    @GetMapping("/club/createClubFolders")
    private ResponseEntity<String> createClubFodlers()
    {
        clubs = getAllDBClubs();
        S3Util S3 = new S3Util("involveu-image");

        for(Club club: clubs)
        {
          S3.createFolders(club.getClubName()+"/");
        }


        return new ResponseEntity<>("success", HttpStatus.OK);

    }

    @PutMapping("club/uploadNewLogo/{clubID}")
    public ResponseEntity<String> uploadNewLogo(@RequestParam("file") MultipartFile newImage, @PathVariable("clubID") int clubID) throws IOException {

      Club clubToUpload = new Club();

        clubToUpload = getSpecficClub(clubID);

        S3Util s3 = new S3Util("involveu-image");
        String filename = newImage.getOriginalFilename();
        System.out.println(filename);

        s3.uploadFile(filename, newImage.getInputStream(),clubToUpload.getClubName());

        return new ResponseEntity<>("Success",HttpStatus.OK	);
    }

    @GetMapping("/club/uploadAllFiles")
    private ResponseEntity<String> uploadAllFiles(@RequestParam("file") MultipartFile newImage) throws IOException {
        clubs = getAllDBClubs();
        S3Util S3 = new S3Util("involveu-image");
        String filename = newImage.getOriginalFilename();
        System.out.println(filename);
        for(Club club: clubs)
        {
            S3.uploadFile(filename, newImage.getInputStream(),club.getClubName());
    }
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    @GetMapping("club/favoriteCount/{clubID}")
    public ResponseEntity<Integer> getFavoriteCount(@PathVariable("clubID") int clubID) {
        int count = dbFavoriteCount(clubID);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @GetMapping("club/memberCount/{clubID}")
    public ResponseEntity<Integer> getMemberCount(@PathVariable("clubID") int clubID) {
        int count = dbMemberCount(clubID);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @PutMapping("/club/uploadBannerDocument/{clubID}")
    public ResponseEntity<String> uploadBannerDocument(@RequestParam("file") MultipartFile bannerDocument, @PathVariable("clubID") int clubID) throws IOException {
        Club clubToUpdate = getSpecficClub(clubID);

        S3Util s3 = new S3Util("involveu-clubfiles");
        String filename = bannerDocument.getOriginalFilename();

        if (!Arrays.asList("application/pdf", "image/jpeg", "image/png").contains(bannerDocument.getContentType())) {
            return new ResponseEntity<>("Invalid file type", HttpStatus.BAD_REQUEST);
        }

        s3.uploadFile(filename, bannerDocument.getInputStream(), "banners/" + clubToUpdate.getClubName());

        updateUserProfilePicPath(clubID, filename);

        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    @GetMapping("/club/getBannerDocument/{clubID}")
    private ResponseEntity<byte[]> downloadBannerDocument(@PathVariable("clubID") int clubID) throws IOException {
        Club club = getSpecficClub(clubID);

        String fileName = getClubBannerName(clubID);

        S3Util bucket = new S3Util("involveu-clubfiles");
        byte[] file = bucket.downloadFile("banners/" + club.getClubName() + "/" + fileName);

        HttpHeaders headers = new HttpHeaders();

        if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) {
            headers.setContentType(MediaType.IMAGE_JPEG);
        } else if (fileName.endsWith(".png")) {
            headers.setContentType(MediaType.IMAGE_PNG);
        } else if (fileName.endsWith(".pdf")) {
            headers.setContentType(MediaType.APPLICATION_PDF);
        }
        
        headers.setContentDispositionFormData("attachment", fileName);

        return new ResponseEntity<>(file, headers, HttpStatus.OK);
    }





}








