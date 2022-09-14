package com.example.involveU.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.involveU.model.User;
import com.example.involveU.repository.UserRepository;

@RestController
@RequestMapping("api/")
public class UserController {

	@Autowired
	private UserRepository userRepository;
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("users")
	public List<User> getUsers() {
		return this.userRepository.findAll();
	}
}
