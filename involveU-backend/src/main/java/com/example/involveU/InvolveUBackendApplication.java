package com.example.involveU;
import com.example.involveU.model.DBServices;
import com.example.involveU.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.involveU.model.User;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;
import java.util.logging.Handler;

@SpringBootApplication
public class InvolveUBackendApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(InvolveUBackendApplication.class, args);
	}


	private DBServices db_Handler = new DBServices();

	private UserRepository userRepo;
	
	@Override
	public void run(String... args) throws Exception {

		List<User> Results = db_Handler.getAllUsers();

		Results.forEach(System.out :: println);


	
	}
}
