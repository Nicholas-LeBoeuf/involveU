package com.example.involveU.model;
import com.example.involveU.repository.UserRepository;
import com.example.involveU.repository.EBoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import javax.sql.DataSource;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import java.util.List;
public class DBServices {

    private UserRepository userRepo;
    private EBoardRepository eboardRepo;
    private List<User> users;
    private List<EBoard> eboardMembers;
    private String sql;
    private int validQuery;
    @Autowired
    private JdbcTemplate JdbcTemplated = new JdbcTemplate();
    private DataSource JdbcDataSource;
    private static final String className = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
    private static final String url = "jdbc:sqlserver://involveu-server.database.windows.net:1433;database=involveU";
    private static final String username = "azureuser";
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

        dataSource.setDriverClassName(className);
        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);

        return dataSource;
    }
    public List<User> getAllUsers()
    {
        sql = "SELECT TOP 501 t.* FROM involveU.dbo.[User] t";
        users = this.JdbcTemplated.query(sql, BeanPropertyRowMapper.newInstance(User.class));
        System.out.println(users);
        return users;
    }

    public List<User> getSpecificUser(int userID)
    {
        sql = "SELECT * FROM [USER] WHERE StudentID = " + userID + ";";
        users = this.JdbcTemplated.query(sql, BeanPropertyRowMapper.newInstance(User.class));

        return users;
    }

    public String checkUserCredentials(String username, String password)
    {
        sql = "SELECT * FROM [USER] WHERE email = '" + username + "'";
        users = this.JdbcTemplated.query(sql, BeanPropertyRowMapper.newInstance(User.class));

        //If size of the array is not checked then there will be a Whitelabel error
        if(users.size() == 1 && users.get(0).getUserPassword().equals(password))
        {
            return String.valueOf(users.get(0).getStudentID());
        }
        else {return "not accepted";}
    }


    public List<EBoard> getEBoardMembers()
    {
        sql = "SELECT TOP 501 t.* FROM involveU.dbo.[EBOARD] t";
        eboardMembers = this.JdbcTemplated.query(sql, BeanPropertyRowMapper.newInstance(EBoard.class));
        System.out.println(eboardMembers);
        return eboardMembers;
    }

    public List<EBoard> getClubEBoardMembers() {
        sql = "SELECT User.studentID, User.firstName, User.lastName, Eboard.eboardPosition FROM [USER] INNER JOIN [EBOARD] ON User.studentID=Eboard.studentID clubID";
        eboardMembers = this.JdbcTemplated.query(sql, BeanPropertyRowMapper.newInstance(EBoard.class));
        return eboardMembers;
    }
    public int insertNewUser(User newUser)
    {
        sql="INSERT INTO [User] (FirstName, LastName, year, Email, isAdmin, isEboard, pronouns,userPassword) VALUES (?,?,?,?,?,?,?,?);";

        //Query executes and sends back an integer for error checking
        validQuery = JdbcTemplated.update(sql,newUser.getFirstName(),newUser.getLastName(), newUser.getYear(),newUser.getEmail(), 0,0,newUser.getPronouns(),newUser.getUserPassword());

        return validQuery;

    }
}
