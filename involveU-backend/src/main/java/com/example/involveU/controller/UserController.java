package com.example.involveU.controller;
import java.io.IOException;
import java.util.List;
import com.example.involveU.model.DBServices;
import com.example.involveU.repository.UserRepository;
import com.example.involveU.model.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/")
public class UserController extends DBServices{

	@Autowired
	private UserRepository userRepository;
	private List<User> foundUser;
	private Object singleUser;
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("user/test")
	public List<User> getUsers() {
		List<User> Results = getAllUsers();
		return Results;
	}
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("user/{id}")
	public List<User> getSpecificUser(@PathVariable("id") int id )
	{

		foundUser = getDBSpecificUser(id);

		return foundUser;
	}
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("user/checkCredentials/{email}/{password}")
	public ResponseEntity<Object> checkCredentials(@PathVariable("email") String email, @PathVariable("password")String password)
	{
		String responseString;
		System.out.println(email + " " + password);
		singleUser = DBcheckUserCredentials(email,password);

		// If the database handler class returns an empty list then this function will return a bad request.

		if(singleUser.equals("error")) {return new ResponseEntity<>( "User not found", HttpStatus.BAD_REQUEST);}
		else {return new ResponseEntity<>( singleUser, HttpStatus.OK);}
	}
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("user/submitSignupInfo")
	public ResponseEntity<String> submitSignupInfo(@RequestBody User userInfo)
	throws IOException{
		int newUserSuccessful;

		newUserSuccessful = insertDBNewUser(userInfo);

		if(newUserSuccessful == 1) {
			return new ResponseEntity<>(HttpStatus.OK);}
		else {return new ResponseEntity<>( HttpStatus.BAD_REQUEST);}
	}
}
