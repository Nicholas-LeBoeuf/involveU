package com.example.involveU.model;
import com.example.involveU.model.DBServices;
import com.example.involveU.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.involveU.model.User;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import javax.sql.DataSource;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import java.util.List;
import java.util.logging.Handler;

public class DBServices {

    private UserRepository userRepo;
   private List<User> users;
   private String sql;
    @Autowired
    private JdbcTemplate JdbcTemplated = new JdbcTemplate();

  private DataSource JbdcDataSource;

    public DBServices()
   {
       DataSource dataSource;

    dataSource = getDataSource();

       JdbcTemplated.setDataSource(dataSource);

   }

    public static DriverManagerDataSource getDataSource() {

        DriverManagerDataSource dataSource = new DriverManagerDataSource();

        dataSource.setDriverClassName("com.microsoft.sqlserver.jdbc.SQLServerDriver");

        dataSource.setUrl("jdbc:sqlserver://involveu-server.database.windows.net:1433;database=involveU");

        dataSource.setUsername("azureuser");

        dataSource.setPassword("Remdog10$");

        return dataSource;
    }
    public List<User> getAllUsers()
    {
        sql = "SELECT TOP 501 t.* FROM involveU.dbo.[User] t";

        users = this.JdbcTemplated.query(sql, BeanPropertyRowMapper.newInstance(User.class));

        System.out.println(users);

        return users;

    }



}
