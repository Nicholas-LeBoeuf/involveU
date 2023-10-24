package com.example.involveU.controller;
import java.io.IOException;
import java.util.List;
import com.example.involveU.model.DBServices;
import com.example.involveU.model.EmailService;
import com.example.involveU.model.S3Util;
import com.example.involveU.repository.UserRepository;
import com.example.involveU.model.User;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

	@PostMapping("user/sendWelcomeMail/{recipient}/{securityCode}")
	public ResponseEntity<String>sendWelcomeMail(@PathVariable("recipient")String recipient, @PathVariable("securityCode")int securityCode) throws IOException {

		if(checkUserExistence(recipient) == true) {
			emailService.sendWelcomeEmail(recipient, securityCode);
			return new ResponseEntity<>("success", HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>( HttpStatus.BAD_REQUEST);
		}
	}

	/*@PutMapping("user/changePassword/{email}/{newPassword}")
	public ResponseEntity<String>changePassword(@PathVariable("email")String email, @PathVariable("newPassword")String newPassword) {
		if(dbChangePassword(email, newPassword)) {
			return new ResponseEntity<>("success", HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>( HttpStatus.BAD_REQUEST);
		}
	}*/

	@GetMapping("user/getUserProfile/{userID}")
	public ResponseEntity<User>getUserProfile(@PathVariable("userID")int userID ) {
		User newUser;
		newUser = getDBUserProfile(userID);
		return new ResponseEntity<>(newUser, HttpStatus.OK);
	}

	/*@GetMapping("user/checkPassword/{userID}/{currentPassword}")
	public ResponseEntity<Boolean>checkPassword(@PathVariable("userID")int userID, @PathVariable("currentPassword")String currentPassword) {
		if (checkDBPassword(userID, currentPassword))
		{
			return new ResponseEntity<>(Boolean.TRUE, HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>(Boolean.FALSE, HttpStatus.BAD_REQUEST);
		}
	}*/

	@PutMapping("user/updatePassword/{userID}/{currentPassword}/{newPassword}")
	public ResponseEntity<String> updatePassword(@PathVariable("userID") int userID, @PathVariable("currentPassword") String currentPassword, @PathVariable("newPassword") String newPassword) {
		if (checkDBPassword(userID, currentPassword)) {
			if (dbChangePassword(userID, newPassword)) {
				return new ResponseEntity<>("success", HttpStatus.OK);
			} else {
				return new ResponseEntity<>("Failed to change password", HttpStatus.INTERNAL_SERVER_ERROR);
			}
		} else {
			return new ResponseEntity<>("Incorrect password", HttpStatus.BAD_REQUEST);
		}
	}


	@PutMapping("user/changePronouns/{userID}") // The pronouns need to be sent in the body of the request because of the "/"
	public ResponseEntity<String>changePronouns(@PathVariable("userID")int userID, @RequestBody String newPronouns) {
		if(dbChangePronouns(userID, newPronouns)) {
			return new ResponseEntity<>("success", HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>( HttpStatus.BAD_REQUEST);
		}
	}

	@PutMapping("user/changeCalColor/{userID}/{newColor}")
	public ResponseEntity<String>changeCalColor(@PathVariable("userID")int userID, @PathVariable("newColor")String newColor) {
		if(dbChangeCalColor(userID, newColor)) {
			return new ResponseEntity<>("success", HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>( HttpStatus.BAD_REQUEST);
		}
	}

	@PutMapping("user/changeYear/{userID}/{newYear}")
	public ResponseEntity<String>changeYear(@PathVariable("userID")int userID, @PathVariable("newYear")String newYear) {
		if(dbChangeYear(userID, newYear)) {
			return new ResponseEntity<>("success", HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>( HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/user/getProfilePicture/{userID}")
	private ResponseEntity<byte[]> downloadUserProfilePicture(@PathVariable("userID") int userID) throws IOException {
		User user = getUser(userID); // Assuming there's a method to fetch user details

		String fileName = getUserProfilePictureName(userID); // Fetch the profile picture name for the user

		S3Util bucket = new S3Util("involveu-pfp");
		byte[] file = bucket.downloadFile(user.getFirstName() + user.getLastName() + "/" + fileName);

		HttpHeaders headers = new HttpHeaders();

		if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) {
			headers.setContentType(MediaType.IMAGE_JPEG);
		} else if (fileName.endsWith(".png")) {
			headers.setContentType(MediaType.IMAGE_PNG);
		}

		return new ResponseEntity<>(file, headers, HttpStatus.OK);
	}

	@GetMapping("/user/createUserFolders")
	private ResponseEntity<String> createUserFolders() {
		List<User> users = getAllUsers(); // Assuming there's a method to fetch all users
		S3Util s3 = new S3Util("involveu-pfp");

		for (User user : users) {
			s3.createFolders(user.getFirstName() + user.getLastName() + "/");
		}

		return new ResponseEntity<>("success", HttpStatus.OK);
	}

	@PutMapping("/user/uploadProfilePicture/{userID}")
	public ResponseEntity<String> uploadProfilePicture(@RequestParam("file") MultipartFile profilePicture, @PathVariable("userID") int userID) throws IOException {
		User userToUpdate = getUser(userID); // Fetch the user details

		S3Util s3 = new S3Util("involveu-pfp");
		String filename = profilePicture.getOriginalFilename();

		s3.uploadFile(filename, profilePicture.getInputStream(), userToUpdate.getFirstName() + userToUpdate.getLastName());

		updateUserProfilePicPath(userID, filename);

		return new ResponseEntity<>("Success", HttpStatus.OK);
	}

	@GetMapping("/user/uploadProfilePicturesForAll")
	public ResponseEntity<String> uploadProfilePicturesForAll(@RequestParam("file") MultipartFile profilePicture) throws IOException {
		List<User> users = getAllUsers();
		S3Util s3 = new S3Util("involveu-pfp");
		String filename = profilePicture.getOriginalFilename();

		for (User user : users) {
			s3.uploadFile(filename, profilePicture.getInputStream(), user.getUserName());
		}

		return new ResponseEntity<>("success", HttpStatus.OK);
	}






}


