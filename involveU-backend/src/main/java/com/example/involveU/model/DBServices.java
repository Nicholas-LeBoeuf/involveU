package com.example.involveU.model;

import jdk.jfr.Event;
import org.hibernate.dialect.lock.PessimisticEntityLockException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.batch.BatchProperties;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import javax.sql.DataSource;
import javax.sql.rowset.serial.SerialBlob;
import javax.sql.rowset.serial.SerialException;

import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.*;



public class DBServices {
    private List<User> users;
    private List<Announcement> announcements;
    private List<EBoard> eboardMembers;
    private List<Space> spaces;
    private List<Events> events;
    private List<Club> clubs;
    private List<RSVP> rsvps;
    private List<SocialMedia> clubSMs;
    private String sql;
    private int validQuery;
    @Autowired
    private JdbcTemplate JdbcTemplated = new JdbcTemplate();
    private final DataSource JdbcDataSource;
    private static final String className = "com.mysql.cj.jdbc.Driver.";
    private static final String url = "jdbc:mysql://involveu.cl8bziw5fohm.us-east-1.rds.amazonaws.com:3306/involveU";
    private static final String username = "awsuser";
    private static final String password ="Remdog10$";
    public DBServices()
   {
       //Creates Datasource object and call getDatasource function to populate connection string information
       JdbcDataSource = getDataSource();
       JdbcTemplated.setDataSource(JdbcDataSource);
   }
    //Creates DriverManagerDatasource to hold connection string information to then return to be set to DataSource class.
    protected static DriverManagerDataSource getDataSource() {

        DriverManagerDataSource dataSource = new DriverManagerDataSource();

        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);

        return dataSource;
    }
    protected List<User> getAllUsers()
    {
        sql = "SELECT * FROM User";
        users = this.JdbcTemplated.query(sql, BeanPropertyRowMapper.newInstance(User.class));
        System.out.println(users);
        return users;
    }
    protected List<User> getDBSpecificUser(int userID)
    {
        sql = "SELECT * FROM User WHERE StudentID = " + userID + ";";
        users = this.JdbcTemplated.query(sql, BeanPropertyRowMapper.newInstance(User.class));

        return users;
    }
    protected int insertDBNewUser(User newUser)
    {
        if( checkUserExistence(newUser.getEmail()))
        {
            sql="INSERT INTO User (firstName, lastName, year, email, isAdmin, isEboard, pronouns,userPassword) VALUES (?,?,?,?,?,?,?,?);";
            validQuery = JdbcTemplated.update(sql,newUser.getFirstName(),newUser.getLastName(), newUser.getYear(),newUser.getEmail(), 0,0,newUser.getPronouns(),newUser.getUserPassword());
        }
        else {
            validQuery = 0;
        }
        //Query executes and sends back an integer for error checking
        return validQuery;
    }
    protected Boolean checkUserExistence(String userEmail)
    {
        sql = "SELECT * FROM User WHERE email = '" + userEmail + "'";
        users  = this.JdbcTemplated.query(sql, BeanPropertyRowMapper.newInstance(User.class));
        return users.size() == 0;
    }
    protected Object DBcheckUserCredentials(String username, String password)
    {
        sql = "SELECT * FROM User WHERE email = '" + username + "'";
        users = this.JdbcTemplated.query(sql, BeanPropertyRowMapper.newInstance(User.class));

        //If size of the array is not checked then there will be a Whitelabel error
        if(users.size() == 1 && users.get(0).getUserPassword().equals(password))
        {
            return users.get(0);
        }
        else
        {
            return "error";
        }
    }
    protected List<EBoard> getDBClubEboardMembers(int clubID) {
        sql = "SELECT User.studentID, User.firstName, User.lastName, Eboard.eboardPosition FROM User INNER JOIN Eboard ON User.studentID=Eboard.studentID AND clubID = "+ clubID +";";
        eboardMembers = this.JdbcTemplated.query(sql, BeanPropertyRowMapper.newInstance(EBoard.class));

        if(eboardMembers.size() > 1)
         eboardMembers = sortEboardArray(eboardMembers);

        return eboardMembers;
    }
    protected List<EBoard> sortEboardArray(List<EBoard> listToSort)
    {
        int indexPresident, indexVPresident;
        List<String> positionsList = new ArrayList<>();
        EBoard tempPrezMember;
        EBoard tempVPPrezMember;
        for(EBoard member: listToSort)
        {
            positionsList.add(member.getEboardPosition());
        }
       indexPresident = positionsList.indexOf("President");
       indexVPresident = positionsList.indexOf("Vice President");
       if(indexPresident == 0 && indexVPresident == 1)
       {
           return listToSort;
       }
       else
       {
           tempPrezMember = listToSort.get(indexPresident);
           listToSort.remove(indexPresident);
           listToSort.add(0,tempPrezMember);
           positionsList.clear();
           for(EBoard member: listToSort)
           {
               positionsList.add(member.getEboardPosition());
           }
           if(indexVPresident == 1)
           {
               return listToSort;
           }
           else
           {
               indexVPresident = positionsList.indexOf("Vice President");
               tempVPPrezMember = listToSort.get(indexVPresident);
               listToSort.remove(indexVPresident);
               listToSort.add(1,tempVPPrezMember);
           }
           return listToSort;
       }
    }

    protected List<User> getDBAllAdmins()
    {
        sql = "SELECT * FROM User JOIN Club C on User.studentID = C.advisorID";
        users = JdbcTemplated.query(sql, BeanPropertyRowMapper.newInstance(User.class));

        return users;
    }
    protected List<User> getDBNoneAdmins()
    {
        sql = "SELECT * FROM User WHERE NOT EXISTS(SELECT * FROM Club WHERE Club.advisorID = User.studentID);";
        users = JdbcTemplated.query(sql, BeanPropertyRowMapper.newInstance(User.class));

        return users;
    }

    protected List<User> getDBAllFaculty()
    {
        sql = "SELECT * FROM User WHERE year = 'Faculty';";
        users = JdbcTemplated.query(sql, BeanPropertyRowMapper.newInstance(User.class));

        return users;
    }
    protected List<User> getDBAllEboard()
    {
        sql = "SELECT * FROM User WHERE isEboard = 1 ";
        users = this.JdbcTemplated.query(sql, BeanPropertyRowMapper.newInstance(com.example.involveU.model.User.class));

        return users;
    }
    protected Boolean checkIfClubEboard(int userID)
    {
        sql = "SELECT * FROM User WHERE studentID = " + userID + " AND isEboard = 1;";
        users = JdbcTemplated.query(sql,BeanPropertyRowMapper.newInstance(User.class));

        if(users.isEmpty())
        {
            return false;
        }
        else
        {
            return true;
        }
    }
    protected Club getEboardClub(int userID)
    {
        Club foundClub;
        sql = "SELECT * FROM Club JOIN Eboard WHERE studentID = "+ userID +" AND Club.clubID = Eboard.clubID;";
        clubs = JdbcTemplated.query(sql, BeanPropertyRowMapper.newInstance(Club.class));

        return clubs.get(0);
    }
    protected List<User> getDBNonEboard()
    {
        sql = "SELECT * FROM User WHERE isEboard = 0";
        users = this.JdbcTemplated.query(sql, BeanPropertyRowMapper.newInstance(com.example.involveU.model.User.class));

        return users;
    }
    protected List<Club> getAllDBClubs()
    {
        sql = "SELECT * FROM Club";
        clubs = this.JdbcTemplated.query(sql, BeanPropertyRowMapper.newInstance(Club.class));

        return clubs;
    }
    protected Club getSpecficClub(int clubID)
    {
        sql = "SELECT * FROM Club WHERE ClubID = " + clubID + ";";

        clubs = this.JdbcTemplated.query(sql, BeanPropertyRowMapper.newInstance(Club.class));

        if (clubs.size() == 0) {

            return null;
        }
        else
        {
            return clubs.get(0);
        }
    }
    protected Boolean insertNewClub(Club newClub)
    {
        sql = "INSERT INTO Club (ownerID, clubName, clubAffiliation, clubBio, clubVision, clubMission, clubValues, clubLogo, advisorID) Values (?,?,?,?,?,?,?,?,?);";
        validQuery = JdbcTemplated.update(sql,newClub.getOwnerID(),newClub.getClubName(), newClub.getClubAffiliation(), newClub.getClubBio(), newClub.getClubVision(), newClub.getClubMission(), newClub.getClubValues(), newClub.getClubLogo(), newClub.getAdvisorID());

        return validQuery == 1;

    }
    protected String getClubLogo(int clubID)
    {
        String clubLogoPath;
        sql = "SELECT clubLogo FROM Club WHERE clubID = ?;";

        clubLogoPath = JdbcTemplated.queryForObject(sql,new Object[]{clubID}, String.class);

        return clubLogoPath;

    }
    protected List<Club> searchDBClub(String searchContent)
    {
        sql = "SELECT * FROM Club WHERE Club.clubName LIKE '%" + searchContent +"%';";
        clubs = this.JdbcTemplated.query(sql,BeanPropertyRowMapper.newInstance(Club.class));

        return clubs;
    }
    protected List<Map<String,Object>> getMostRSVPEvents()
    {
        List<Map<String,Object>> results;
        sql = "select RSVP.eventID,count(*) as Total from RSVP group by eventID;";
        results = JdbcTemplated.queryForList(sql);

        return results;
    }
    protected Boolean submitDBFavorite(int id, int clubID)
    {
        sql = "INSERT INTO Favorites (userID, clubID) values (?,?);";
        validQuery = JdbcTemplated.update(sql,String.valueOf(id),String.valueOf(clubID));

       return validQuery == 1;
    }
    protected List<Club> getDBUserFavorites(int userID)
    {
        sql = "SELECT Club.clubID, Club.clubName, Club.clubAffiliation, Club.clubBio, Club.clubVision, Club.clubLogo, Club.advisorID FROM Club INNER JOIN Favorites ON Club.ClubID = Favorites.ClubID AND Favorites.UserID = "+userID+";";

        clubs = JdbcTemplated.query(sql,BeanPropertyRowMapper.newInstance(Club.class));
        return clubs;
    }
    protected Boolean removeDBFavorite(int clubID, int userID)
    {
        sql = "DELETE FROM Favorites WHERE userID = ? AND clubID = ? ;";

        validQuery = JdbcTemplated.update(sql,userID, clubID);

        return validQuery == 1;
    }
    protected User getDBClubAdvisor(int clubID)
    {
        sql = "SELECT User.firstName, User.LastName FROM User JOIN Club C on C.clubID = " + clubID + "  AND User.studentID = advisorID;";

        users = JdbcTemplated.query(sql, BeanPropertyRowMapper.newInstance(User.class));

        return users.get(0);
    }

    protected Boolean assignDBAdvisor(int advisorID, int clubID)
    {
        sql = "UPDATE Club SET advisorID = ? WHERE clubID = ?;";
        //Catches if the Admin tries to add a user to an advisor to a club that is already an advisor to another club
        try{
            validQuery = JdbcTemplated.update(sql,advisorID,clubID);
        }catch(Exception e)
        {
            System.out.println(e);
            return false;
        }
        return validQuery == 1;
    }
    protected Boolean addDBEboardMember(int userId, int clubID, String position)
    {
        sql = "INSERT INTO Eboard (clubID, studentID,eboardPosition ) VALUES (?,?,?);";

        validQuery = JdbcTemplated.update(sql,clubID,userId,position);

        sql = "UPDATE User SET isEboard = ? WHERE studentID = ? ";

        validQuery = JdbcTemplated.update(sql,1, userId);

        if(validQuery == 1)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    protected Boolean deleteDBUser(int userID) {


        if(deleteDBEboardMember(userID) && deleteAllFavorites(userID) && deleteAllRSVPS(userID))
        {
            sql = "DELETE FROM User WHERE studentID = ?";

            validQuery = JdbcTemplated.update(sql,userID);

            return true;
        }
        else
        {
            return false;
        }

    }
    protected Boolean deleteDBEboardMember(int userID)
    {
        sql = "DELETE FROM Eboard WHERE studentID = ?";
        validQuery = JdbcTemplated.update(sql,userID);

        sql = "UPDATE User SET isEboard = 0 WHERE  studentID = ? ";
        validQuery = JdbcTemplated.update(sql,userID);

        if(validQuery == 1)
        {
            return true;
        }
        else
        {
            return false;
        }

    }
    protected Boolean deleteAllFavorites(int userID)
    {
        sql = "DELETE FROM Favorites WHERE userID = ?";
        validQuery = JdbcTemplated.update(sql,userID);
        return true;
    }
    protected Boolean deleteAllRSVPS(int userID)
    {
        sql = "DELETE FROM RSVP WHERE studentID = ?";
        validQuery = JdbcTemplated.update(sql,userID);
        return true;
    }

    //EVENTS CONTROLLER
    protected List<Events> getDBEvents()
    {
        sql = "SELECT * FROM Events;";
        events = JdbcTemplated.query(sql,BeanPropertyRowMapper.newInstance(Events.class));

        return events;
    }
    protected boolean insertNewEvent(Events newEvent)
    {

         sql = "INSERT INTO Events (eventName, startTime, eventLocation,endTime,eventDate,eventDesc, isTransportation, ticketLink,clubName,clubId) Values (?,?,?,?,?,?,?,?,?,?)";


         validQuery = JdbcTemplated.update(sql, newEvent.getEventName(), newEvent.getStartTime(), newEvent.getEventLocation(), newEvent.getEndTime(), newEvent.getEventDate(), newEvent.getEventDesc(), newEvent.getIsTransportation(), newEvent.getTicketLink(), newEvent.getClubName(), newEvent.getClubID());

         return validQuery == 1;
    }
    protected boolean updateDBEvent(Events eventToUpdate)
    {
        sql = "UPDATE Events SET eventName = ?, eventLocation = ?, startTime = ?, endTime = ?, eventDate = ?, eventDesc = ?, isTransportation = ?, ticketLink = ? WHERE eventID = " + eventToUpdate.getEventID();

        validQuery = JdbcTemplated.update(sql,eventToUpdate.getEventName(), eventToUpdate.getEventLocation(), eventToUpdate.getStartTime(),  eventToUpdate.getEndTime(), eventToUpdate.getEventDate(), eventToUpdate.getEventDesc(), eventToUpdate.getIsTransportation(), eventToUpdate.getTicketLink());

        return validQuery == 1;
    }

    protected  boolean removeDBEvent(int eventID){

        sql = "DELETE  FROM Events WHERE eventID = " + eventID;

        validQuery = JdbcTemplated.update(sql);

        return validQuery == 1;
    }

  protected Events getEventByID(int eventID)
    {

        sql = "SELECT * FROM Events JOIN Spaces WHERE space_ID = eventLocation AND eventID = "+eventID+";";
        events = JdbcTemplated.query(sql, BeanPropertyRowMapper.newInstance(Events.class));
        events.get(0).setEventLocation(getDBLocationsByID(events.get(0).getLocation_ID()).get(0).getLocationName());

        return events.get(0);
    }
    protected List<Events> getDBTodaysEvents()
     {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date();
        String strDate = formatter.format(date);

        sql = "SELECT * FROM Events WHERE  eventDate = '" + strDate +"' ORDER BY startTime ASC ;";
        events = JdbcTemplated.query(sql,BeanPropertyRowMapper.newInstance(Events.class));

        return events;
    }
    protected  List<Events> getDBClubEvents(int clubID)
    {
        sql = "SELECT * FROM Events JOIN Spaces WHERE space_ID = eventLocation AND clubID = " + clubID + " ORDER BY eventDate, startTime ASC ;";

        events = JdbcTemplated.query(sql,BeanPropertyRowMapper.newInstance(Events.class));

        for(Events event: events)
        {
            event.setEventLocation(getDBLocationsByID(event.getLocation_ID()).get(0).getLocationName());
        }
        return events;
    }

    protected List<Events> getDBAllFutureEvents()
    {
        sql = "SELECT * FROM Events WHERE eventDate >= DATE(NOW())  ORDER BY eventDate ,startTime ASC;";
        events = JdbcTemplated.query(sql,BeanPropertyRowMapper.newInstance(Events.class));

        return events;
    }
    protected  List<Events> getDBFutureFavoriteClubEvents(int userID)
    {
        sql = "select Events.eventID, Events.eventName, Events.startTime, Events.eventLocation, Events.endTime, Events.eventDate, Events.eventDesc, Events.isTransportation, Events.ticketLink, Events.clubName, Events.clubID, Spaces.spaceName, Spaces.location_ID from Events JOIN Favorites ON eventDate >= DATE(NOW()) AND Events.clubID = Favorites.clubID AND Favorites.userID = "+userID+" JOIN Spaces WHERE space_ID = Events.eventLocation ORDER BY eventDate ,startTime ASC;";

        events = JdbcTemplated.query(sql,BeanPropertyRowMapper.newInstance(Events.class));

        for(Events event: events)
        {
            event.setEventLocation(getDBLocationsByID(event.getLocation_ID()).get(0).getLocationName());
        }

        return  events;
    }
    protected  List<Events> getDBFavoriteClubEvents(int userID)
    {
        sql = "select Events.eventID, Events.eventName, Events.startTime, Events.eventLocation, Events.endTime, Events.eventDate, Events.eventDesc, Events.isTransportation, Events.ticketLink, Events.clubName, Events.clubID, Spaces.spaceName, Spaces.location_ID from Events JOIN Favorites ON Events.clubID = Favorites.clubID AND Favorites.userID = "+ userID+" JOIN Spaces WHERE space_ID = Events.eventLocation ORDER BY eventDate ,startTime ASC; ";

        events = JdbcTemplated.query(sql,BeanPropertyRowMapper.newInstance(Events.class));

        for(Events event: events)
        {
            event.setEventLocation(getDBLocationsByID(event.getLocation_ID()).get(0).getLocationName());
        }
        return  events;
    }

    protected boolean insertRsvpEvent(int eventID, int userID)
    {
        //setting validQuery to 1 ensures that it won't accidentally be set to 0 on last use.
        validQuery = 1;
        sql = "SELECT * FROM RSVP WHERE studentID = " + userID + ";";
        rsvps = JdbcTemplated.query(sql,BeanPropertyRowMapper.newInstance(RSVP.class));

        //Checks if the event requested to be added is already in the database
        for(RSVP rsvp : rsvps) {
            if (eventID == rsvp.getEventID() && userID == rsvp.getStudentID()) {
                validQuery = 0;
                break;
            }
        }
        if(validQuery == 1) {

            sql = "INSERT INTO RSVP (studentID, eventID) VALUES (?,?);";
            validQuery = JdbcTemplated.update(sql, userID, eventID);
        }

        return validQuery == 1;
    }
    protected boolean removeDBRsvp(int userID, int eventID)
    {
        sql = "DELETE FROM RSVP WHERE studentID = ? AND eventID = ?;";
        validQuery = JdbcTemplated.update(sql, userID, eventID);

        return validQuery == 1;
    }

    protected List<Events> getAllUserRsvp(int userID)
    {
        sql = "SELECT Events.eventID ,eventName, startTime, eventLocation, endTime, eventDate,eventDesc, isTransportation,ticketLink, Spaces.location_ID, Spaces.spaceName FROM Events JOIN RSVP AS R ON R.eventID = Events.eventID AND R.studentID = " + userID + " JOIN Spaces WHERE space_ID = Events.eventLocation ORDER BY eventDate ,startTime ASC;";
        events = JdbcTemplated.query(sql,BeanPropertyRowMapper.newInstance(Events.class));

        for(Events event: events)
        {
            event.setEventLocation(getDBLocationsByID(event.getLocation_ID()).get(0).getLocationName());
        }
        return events;
    }
    protected List<Events> getAllClubRsvp(int clubID)
    {
        sql = "SELECT Events.eventID ,eventName, startTime, eventLocation, endTime, eventDate,eventDesc, isTransportation,ticketLink FROM Events JOIN RSVP AS R ON R.eventID = Events.eventID AND Events.clubID = "+clubID +";";
        events = JdbcTemplated.query(sql,BeanPropertyRowMapper.newInstance(Events.class));

        for(Events event: events)
        {
            event.setEventLocation(getDBLocationsByID(event.getLocation_ID()).get(0).getLocationName());
        }
        return events;
    }

    protected List<Events> getAllEvents()
    {
        sql = "SELECT * FROM Events JOIN Spaces WHERE space_ID = eventLocation ;";

        events = JdbcTemplated.query(sql,BeanPropertyRowMapper.newInstance(Events.class));

        for(Events event: events)
        {
            event.setEventLocation(getDBLocationsByID(event.getLocation_ID()).get(0).getLocationName());
        }
        return events;
    }
    protected List<Events>  getEventsByLocationID(String locationID)
    {
        sql = "SELECT * FROM Events JOIN Spaces WHERE Events.eventLocation = "+locationID+" AND Events.eventLocation = Spaces.space_ID;";
        events = JdbcTemplated.query(sql,BeanPropertyRowMapper.newInstance(Events.class));

        for(Events event: events)
        {
            event.setEventLocation(getDBLocationsByID(event.getLocation_ID()).get(0).getLocationName());
        }
        return events;
    }
    //LOCATIONS CONTROLLER

   protected List<Space> getAllDBLocations()
    {
        sql = "SELECT * FROM Location;";

        spaces = JdbcTemplated.query(sql, BeanPropertyRowMapper.newInstance(Space.class));
        return spaces;
    }
    protected List<Space> getDBLocationsByID(int locationID)
    {
        sql = "SELECT * FROM  Location WHERE location_ID = "+locationID+ ";";

        spaces = JdbcTemplated.query(sql,BeanPropertyRowMapper.newInstance(Space.class));
        return spaces;
    }

    protected  List<Space> getSpacesByLocation(int locationID)
    {
        sql = "SELECT * FROM Location JOIN Spaces S ON Location.location_ID = S.location_ID WHERE S.location_ID = " +locationID +"; ";

        spaces = JdbcTemplated.query(sql,BeanPropertyRowMapper.newInstance(Space.class));
        return spaces;
    }

    //Announcements Controller
    protected List<Announcement> getAllDBAnnouncements()
    {
        sql = "SELECT * FROM Announcements WHERE expiresON > DATE(NOW()) ORDER BY postedOn DESC;";

        announcements = JdbcTemplated.query(sql, BeanPropertyRowMapper.newInstance(Announcement.class));

        return announcements;
    }

    protected boolean createDBAnnouncement(Announcement newAnnouncement)
    {
        sql = "INSERT INTO Announcements (clubID, contentOfAnnouncement, expiresOn, announcementTitle, postedOn) VALUES (?,?,?,?,?);";

        validQuery = JdbcTemplated.update(sql,newAnnouncement.getClubID(), newAnnouncement.getContentOfAnnouncement(),newAnnouncement.getExpiresOn(),newAnnouncement.getAnnouncementTitle(), newAnnouncement.getPostedOn());

        return validQuery == 1;
    }

    protected boolean deleteDBAnnouncement(int announcementID)
    {
        sql = "DELETE FROM Announcements WHERE announcementID = "+announcementID+";";

        validQuery = JdbcTemplated.update(sql);

        return validQuery == 1;
    }

    protected boolean editDBAnnouncement(Announcement announcementToEdit) {

            sql = "UPDATE Announcements SET contentOfAnnouncement = ?, expiresOn = ?, announcementTitle = ?, postedOn = ? WHERE announcementID = " + announcementToEdit.getAnnouncementID() +";";
            validQuery = JdbcTemplated.update(sql, announcementToEdit.getContentOfAnnouncement(),announcementToEdit.getExpiresOn(),announcementToEdit.getAnnouncementTitle(), announcementToEdit.getPostedOn());

            return validQuery == 1;

    }

    protected  List<Announcement> getDBFavoritedAnnouncements(int userID)
    {
        sql = "select Announcements.announcementID, Announcements.clubID, Announcements.contentOfAnnouncement, Announcements.expiresOn, Announcements.announcementTitle, Club.clubName from Announcements join Favorites F on Announcements.clubID = F.clubID AND F.userID = " + userID +" AND expiresON > DATE(NOW()) JOIN Club WHERE Announcements.clubID = Club.clubID ORDER BY postedOn DESC;";

        announcements = JdbcTemplated.query(sql, BeanPropertyRowMapper.newInstance(Announcement.class));
        return announcements;
    }

    protected  List<Announcement> getDBClubAnnouncements(int clubID)
    {
        sql = "select announcementID, Announcements.clubID, contentOfAnnouncement, expiresOn, announcementTitle, Club.clubName from Announcements JOIN Club ON Announcements.clubID =  "+ clubID+ "  and Announcements.clubID = Club.clubID;";
        announcements = JdbcTemplated.query(sql, BeanPropertyRowMapper.newInstance(Announcement.class));
        return announcements;
    }



    //SOCIAL MEDIA

    protected List<SocialMedia> getDBClubSocialMedia(int clubID)
    {
        sql = "SELECT * FROM SocialMedia WHERE clubID = " + clubID + ";";

        clubSMs = JdbcTemplated.query(sql, BeanPropertyRowMapper.newInstance(SocialMedia.class));

        return clubSMs;
    }
    protected boolean deleteDBSocialMedia(int smID)
    {
        sql = "DELETE FROM SocialMedia WHERE socialMediaID = ?;";

        validQuery = JdbcTemplated.update(sql,smID);

        return validQuery == 1;
    }

}
