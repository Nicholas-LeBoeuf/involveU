package com.example.involveU.controller;
import java.util.List;
import com.example.involveU.model.DBServices;
import com.example.involveU.repository.UserRepository;
import com.example.involveU.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
	public ResponseEntity<String> checkCredentials(@PathVariable("username") String username, @PathVariable("password")String password)
	{
		String repsonseString;
		System.out.println(username + " " + password);
		repsonseString = dbHandler.checkUserCredentials(username,password);

		// If the database handler class returns an empty list then this function will return a bad request.
		if(repsonseString.equals("not accepted")) {return new ResponseEntity<>( repsonseString, HttpStatus.BAD_REQUEST);}
		else {return new ResponseEntity<>( repsonseString, HttpStatus.OK);}



	}

}
