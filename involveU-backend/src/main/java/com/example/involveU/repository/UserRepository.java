package com.example.involveU.repository;

import com.example.involveU.model.DBServices;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.involveU.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
}





