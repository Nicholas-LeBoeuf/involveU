package com.example.involveU.controller;
import java.util.List;
import com.example.involveU.model.DBServices;
import com.example.involveU.repository.UserRepository;
import com.example.involveU.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/")
public class UserController {

	@Autowired
	private UserRepository userRepository;
	private DBServices dbHandler = new DBServices();
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("user")
	public List<User> getUsers() {
		List<User> Results = dbHandler.getAllUsers();
		return Results;
	}
}
