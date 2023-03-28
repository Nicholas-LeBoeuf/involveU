package com.example.involveU.controller;
import java.io.IOException;
import java.util.List;
import com.example.involveU.model.DBServices;
import com.example.involveU.model.EmailService;
import com.example.involveU.repository.UserRepository;
import com.example.involveU.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.w3c.dom.ls.LSOutput;

@RestController
@RequestMapping("api/")
public class UserController extends DBServices{

	@Autowired
	private UserRepository userRepository;
	private EmailService emailService;
	private List<User> foundUser;
	private Object singleUser;

	public UserController(EmailService emailService) {
		this.emailService = emailService;
	}


	@GetMapping("/healthCheck")
	public ResponseEntity<String> healthCheck()
	{
		return new ResponseEntity ("success", HttpStatus.OK);
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("user/getAllUsers")
	public List<User> getUsers() {
		List<User> Results = getAllUsers();
		return Results;
	}
	//@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("user/{id}")
	public List<User> getSpecificUser(@PathVariable("id") int id )
	{
		foundUser = getDBSpecificUser(id);

		return foundUser;
	}

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

	@PostMapping("user/submitSignupInfo")
	public ResponseEntity<String> submitSignupInfo(@RequestBody User userInfo)
	throws IOException{
		int newUserSuccessful;

		newUserSuccessful = insertDBNewUser(userInfo);

		if(newUserSuccessful == 1) {
			return new ResponseEntity<>(HttpStatus.OK);}
		else {return new ResponseEntity<>( HttpStatus.BAD_REQUEST);}
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("user/getAllFaculty")
	public List<User>getAllFaculty()
	{
		foundUser = getDBAllFaculty();

		return foundUser;
	}
	@PostMapping("user/sendMail/{recipient}/{securityCode}")
	public ResponseEntity<String>sendMail(@PathVariable("recipient")String recipient, @PathVariable("securityCode")int securityCode) throws IOException {

		if(checkUserExistence(recipient) == false) {
			emailService.sendEmail(recipient, securityCode);
			return new ResponseEntity<>("success", HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>( HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("user/verifyAccountMail/{recipient}/{securityCode}")
	public ResponseEntity<String>verifyAccountMail(@PathVariable("recipient")String recipient, @PathVariable("securityCode")int securityCode) throws IOException {
		emailService.sendEmail(recipient, securityCode);
		return new ResponseEntity<>("success", HttpStatus.OK);
	}

	@PutMapping("user/changePassword/{email}/{newPassword}")
	public ResponseEntity<String>changePassword(@PathVariable("email")String email, @PathVariable("newPassword")String newPassword) {
		if(dbChangePassword(email, newPassword) == true) {
			System.out.println("Success");
			return new ResponseEntity<>("success", HttpStatus.OK);
		}
		else{
			System.out.println("Fail");
			return new ResponseEntity<>( HttpStatus.BAD_REQUEST);
		}
	}
}
