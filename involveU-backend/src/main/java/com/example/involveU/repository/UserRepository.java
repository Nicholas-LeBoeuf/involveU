package com.example.involveU.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.involveU.model.User;

public interface UserRepository extends JpaRepository<User, Long> {




}

