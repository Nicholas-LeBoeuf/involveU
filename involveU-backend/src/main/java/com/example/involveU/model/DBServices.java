package com.example.involveU.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import javax.sql.DataSource;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import java.util.List;
import java.util.Map;
import java.text.SimpleDateFormat;
import java.util.Date;



public class DBServices {
    private List<User> users;
    private List<EBoard> eboardMembers;
    private List<Events> events;
    private List<Club> clubs;
    private List<RSVP> rsvps;
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


        if( checkUserExistence(newUser.getEmail()) == 1 )
        {
            sql="INSERT INTO User (FirstName, LastName, year, Email, isAdmin, isEboard, pronouns,userPassword) VALUES (?,?,?,?,?,?,?,?);";
            validQuery = JdbcTemplated.update(sql,newUser.getFirstName(),newUser.getLastName(), newUser.getYear(),newUser.getEmail(), 0,0,newUser.getPronouns(),newUser.getUserPassword());
        }
        else {
            validQuery = 0;
        }
        //Query executes and sends back an integer for error checking
        return validQuery;
    }
    protected int checkUserExistence(String userEmail)
    {
        sql = "SELECT * FROM User WHERE email = '" + userEmail + "'";
        users  = this.JdbcTemplated.query(sql, BeanPropertyRowMapper.newInstance(User.class));

        if(users.size() > 0 )
        {
            return 0;
        }
        else
        {
            return 1;
        }

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
        return eboardMembers;
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
    protected String insertNewClub(Club newClub)
    {
        sql = "INSERT INTO Club (ownerID, clubName, clubAffiliation, clubBio, clubVision, clubMission, clubValues, clubLogo, clubAdvisor) Values (?,?,?,?,?,?,?,?,?);";
        validQuery = JdbcTemplated.update(sql,newClub.getOwnerID(),newClub.getClubName(), newClub.getClubAffiliation(), newClub.getClubBio(), newClub.getClubVision(), newClub.getClubMission(), newClub.getClubValues(), newClub.getClubLogo(), newClub.getAdvisorID());

        if(validQuery == 1)
        {
            return "Club successfully created";
        }
        else
        {
            return "error";
        }

    }
    protected List<Club> searchDBClub(String searchContent)
    {
        sql = "SELECT * FROM Club WHERE Club.clubName LIKE '%" + searchContent +"%';";
        clubs = this.JdbcTemplated.query(sql,BeanPropertyRowMapper.newInstance(Club.class));

        return clubs;
    }
    protected List<Map<String,Object>> getMostFavoriteClubs()
    {
        List<Map<String,Object>> results;
        sql = "select Favorites.ClubID,count(*) as Total from Favorites group by clubID;";
        results = JdbcTemplated.queryForList(sql);

        return results;
    }
    protected String submitDBFavorite(int id, int clubID)
    {
        sql = "INSERT INTO Favorites (userID, clubID) values (?,?);";
        validQuery = JdbcTemplated.update(sql,String.valueOf(id),String.valueOf(clubID));

        if(validQuery == 1)
        {
            return "accepted";
        }
        else
        {
            return "error";
        }
    }
    protected List<Club> getDBUserFavorites(int userID)
    {
        sql = "SELECT Club.clubID, Club.clubName, Club.clubAffiliation, Club.clubBio, Club.clubVision, Club.clubLogo, Club.clubAdvisor FROM Club INNER JOIN Favorites ON Club.ClubID = Favorites.ClubID AND Favorites.UserID = "+userID+";";

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
        sql = "SELECT User.firstName, User.LastName FROM User JOIN Club C on C.clubID = " + clubID + "  AND User.studentID = clubAdvisor;";

        users = JdbcTemplated.query(sql, BeanPropertyRowMapper.newInstance(User.class));

        return users.get(0);
    }

    protected Boolean assignDBAdvisor(int clubID, int userID)
    {
        sql = "UPDATE Club SET clubAdvisor = ? WHERE clubID = ?;";
        //Catches if the Admin tries to add a user to an advisor to a club that is already an advisor to another club
        try{
            validQuery = JdbcTemplated.update(sql,userID,clubID);
        }catch(Exception e)
        {
            System.out.println(e);
            return false;
        }

        if(validQuery == 1)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    protected Boolean addDBEboardMember(int userId, int clubID, String position)
    {
        sql = "INSERT INTO Eboard (clubID, studentID,eboardPosition ) VALUES (?,?,?);";

        validQuery = JdbcTemplated.update(sql,clubID,userId,position);

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
        sql = "DELETE FROM User WHERE studentID = ?;";

        validQuery = JdbcTemplated.update(sql,userID);

        if(deleteDBEboardMember(userID) && deleteAllFavorites(userID) && validQuery == 1)
        {
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
        if(validQuery == 1)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    //EVENTS CONTROLLER
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
        sql = "SELECT * FROM Events WHERE clubID = " + clubID + " ORDER BY eventDate, startTime ASC ;";

        events = JdbcTemplated.query(sql,BeanPropertyRowMapper.newInstance(Events.class));

        return events;
    }

    protected List<Events> getDBAllFutureEvents()
    {
        sql = "SELECT * FROM Events WHERE eventDate >= DATE(NOW()) ORDER BY eventDate ,startTime ASC;";
        events = JdbcTemplated.query(sql,BeanPropertyRowMapper.newInstance(Events.class));

        return events;
    }
    protected  List<Events> getDBFavoriteClubEvents(int userID)
    {
        sql = "select eventID ,eventName, startTime, eventLocation, endTime, eventDate,eventDesc, isTransportation,ticketLink, Events.clubID from Events JOIN Favorites ON eventDate >= DATE(NOW()) AND Events.clubID = Favorites.clubID AND Favorites.userID = "+userID +" ORDER BY eventDate ,startTime ASC;\n";

        events = JdbcTemplated.query(sql,BeanPropertyRowMapper.newInstance(Events.class));

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


}
