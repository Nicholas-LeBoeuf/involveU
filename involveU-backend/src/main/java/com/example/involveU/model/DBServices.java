package com.example.involveU.model;
import com.example.involveU.repository.UserRepository;
import com.example.involveU.repository.EBoardRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import javax.sql.DataSource;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import java.util.List;
import java.util.Map;

public class DBServices {

    private UserRepository userRepo;
    private EBoardRepository eboardRepo;
    private List<User> users;
    private List<EBoard> eboardMembers;
    private List<Club> clubs;
    private Club foundClub;
    private String sql;
    private int validQuery;
    @Autowired
    private JdbcTemplate JdbcTemplated = new JdbcTemplate();
    private DataSource JdbcDataSource;
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
    public static DriverManagerDataSource getDataSource() {

        DriverManagerDataSource dataSource = new DriverManagerDataSource();


        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);

        return dataSource;
    }
    public List<User> getAllUsers()
    {
        sql = "SELECT * FROM User";
        users = this.JdbcTemplated.query(sql, BeanPropertyRowMapper.newInstance(User.class));
        System.out.println(users);
        return users;
    }
    public List<User> getSpecificUser(int userID)
    {
        sql = "SELECT * FROM User WHERE StudentID = " + userID + ";";
        users = this.JdbcTemplated.query(sql, BeanPropertyRowMapper.newInstance(User.class));

        return users;
    }
    public int insertNewUser(User newUser)
    {
        sql = "SELECT * FROM User WHERE email = '" + newUser.getEmail() + "'";
        users  = this.JdbcTemplated.query(sql, BeanPropertyRowMapper.newInstance(User.class));

        if( users.size() < 1)
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

    public Object checkUserCredentials(String username, String password)
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


    public List<EBoard> getEBoardMembers()
    {
        sql = "SELECT * FROM Eboard";
        eboardMembers = this.JdbcTemplated.query(sql, BeanPropertyRowMapper.newInstance(EBoard.class));
        System.out.println(eboardMembers);
        return eboardMembers;
    }

    public List<EBoard> getClubEBoardMembers() {
        sql = "SELECT User.studentID, User.firstName, User.lastName, Eboard.eboardPosition FROM User INNER JOIN Eboard ON User.studentID=Eboard.studentID clubID";
        eboardMembers = this.JdbcTemplated.query(sql, BeanPropertyRowMapper.newInstance(EBoard.class));
        return eboardMembers;
    }


    public List<Club> getAllDBClubs(){

        sql = "SELECT * FROM Club";
        clubs = this.JdbcTemplated.query(sql, BeanPropertyRowMapper.newInstance(Club.class));

        return clubs;
    }

    public Club getSpecficClub(int clubID) {

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
    public String insertNewClub(Club newClub)
    {
        sql = "INSERT INTO Club (ownerID, clubName, clubAffiliation, clubBio, clubVision, clubLogo, clubAdvisor) Values (?,?,?,?,?,?,?);";
        validQuery = JdbcTemplated.update(sql,newClub.getOwnerID(),newClub.getClubName(), newClub.getClubAffiliation(), newClub.getClubBio(), newClub.getClubVision(), newClub.getClubLogo(),newClub.getAdvisorID());

        if(validQuery == 1)
        {
            return "Club successfully created";
        }
        else
        {
            return "error";
        }

    }

    public List<Club> searchDBClub(String searchContent)
    {
        sql = "SELECT * FROM Club WHERE Club.clubName LIKE '%" + searchContent +"%';";
        clubs = this.JdbcTemplated.query(sql,BeanPropertyRowMapper.newInstance(Club.class));

        return clubs;
    }
    public List<Map<String,Object>> getMostFavoriteClubs()
    {
        List<Map<String,Object>> results;
        sql = "select Favorites.ClubID,count(*) as Total from Favorites group by clubID;";
        results = JdbcTemplated.queryForList(sql);

        return results;
    }
    public String submitDBFavorite(int id, int clubID){

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
    public List<Club> getDBUserFavorites(int userID)
    {
        sql = "SELECT * FROM Favorites WHERE Favorites.userID = \" " + userID + "\";";

        clubs = JdbcTemplated.query(sql,BeanPropertyRowMapper.newInstance(Club.class));
        return clubs;
    }





}
