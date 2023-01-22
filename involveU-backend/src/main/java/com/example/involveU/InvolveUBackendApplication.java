package com.example.involveU;
import com.example.involveU.model.DBServices;
import com.example.involveU.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.example.involveU.model.User;
import java.util.List;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
@SpringBootApplication
public class InvolveUBackendApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(InvolveUBackendApplication.class, args);
	}
	private DBServices db_Handler = new DBServices();

	private UserRepository userRepo;

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(InvolveUBackendApplication.class);
	}
//	public void run(String... args) throws Exception {
////		List<User> Results = db_Handler.getAllUsers();
////		Results.forEach(System.out :: println);
//	}
}
