package com.example.involveU;

import com.example.involveU.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.involveU.model.User;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

@SpringBootApplication
public class InvolveUBackendApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(InvolveUBackendApplication.class, args);
	}

	@Autowired
	private JdbcTemplate JbdbcTemplated;

	private UserRepository userRepo;
	
	@Override
	public void run(String... args) throws Exception {
		String sql = "SELECT TOP 501 t.* FROM involveU.dbo.[User] t";
		List<User> Results = JbdbcTemplated.query(sql, BeanPropertyRowMapper.newInstance(User.class));

		Results.forEach(System.out :: println);


	
	}
}
