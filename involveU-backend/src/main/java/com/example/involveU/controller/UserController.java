package com.example.involveU.controller;
import java.util.List;
import com.example.involveU.model.DBServices;
import com.example.involveU.repository.UserRepository;
import com.example.involveU.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("user/{id}")
	public List<User> getSpecificUser(@PathVariable("id") int id )
	{
		List<User> foundUser;
		foundUser = dbHandler.getSpecificUser(id);

		return foundUser;

	}
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("user/checkCredentials/{username}/{password}")
	public void checkCredentials(@PathVariable("username") String username,  @PathVariable("password")String password)
	{

		System.out.println(username + " " + password);


	}

}
