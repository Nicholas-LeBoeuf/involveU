package com.example.involveU.model;
import com.example.involveU.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import javax.sql.DataSource;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import java.util.List;
public class DBServices {

    private UserRepository userRepo;
    private List<User> users;
    private String sql;
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

}
