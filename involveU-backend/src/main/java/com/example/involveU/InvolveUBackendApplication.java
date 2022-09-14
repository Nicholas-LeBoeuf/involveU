package com.example.involveU;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.involveU.model.User;
import com.example.involveU.repository.UserRepository;

@SpringBootApplication
public class InvolveUBackendApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(InvolveUBackendApplication.class, args);
	}

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public void run(String... args) throws Exception {
		this.userRepository.save(new User("Nick", "LeBoeuf", "njleboeuf@gmail.com"));
		this.userRepository.save(new User("Nick", "Gaston", "ngaston@gmail.com"));
		this.userRepository.save(new User("Ryan", "Simas", "rsimas@gmail.com"));
		this.userRepository.save(new User("Will", "Gagne", "wgagne@gmail.com"));
	
	}
}
