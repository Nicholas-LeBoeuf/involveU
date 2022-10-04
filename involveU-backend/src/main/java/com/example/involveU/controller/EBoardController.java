package com.example.involveU.controller;
import java.io.IOException;
import java.util.List;
import com.example.involveU.model.DBServices;
import com.example.involveU.repository.UserRepository;
import com.example.involveU.model.EBoard;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/")

public class EBoardController {
    @Autowired
    private UserRepository userRepository;
    private DBServices dbHandler = new DBServices();
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("eboard/test")
    public List<EBoard> getEBoardMembers(){
        List<EBoard> EBoardMembers = dbHandler.getEBoardMembers();
        return EBoardMembers;
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("eboard/{clubID}")
    public List<EBoard> getClubEBoardChair(@PathVariable("clubID") int clubID)
    {
        List<EBoard> clubEBoardChair = dbHandler.getClubEBoardMembers(clubID);
        return clubEBoardChair;
    }
}
