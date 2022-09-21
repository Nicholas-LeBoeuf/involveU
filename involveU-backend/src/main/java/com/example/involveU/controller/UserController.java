package com.example.involveU.controller;

import java.util.List;
import com.example.involveU.repository.UserRepository;
import com.example.involveU.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("api/")
public class UserController {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private JdbcTemplate JbdbcTemplated;
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("user")
	public List<User> getUsers() {

		String sql = "SELECT TOP 501 t.* FROM involveU.dbo.[User] t";
		List<User> Results = JbdbcTemplated.query(sql, BeanPropertyRowMapper.newInstance(User.class));
		return Results;
	}
}
