package com.example.involveU.controller;
import java.util.List;
import com.example.involveU.model.DBServices;
import com.example.involveU.repository.EBoardRepository;
import com.example.involveU.model.EBoard;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/")

public class EBoardController extends  DBServices{
    @Autowired
    private EBoardRepository eBoardRepository;
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("eboard/test")
    public List<EBoard> getEBoardMembers(){
        List<EBoard> EBoardMembers = getDBEboardMembers();
        return EBoardMembers;
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("eboard/{clubID}")
    public List<EBoard> getClubEBoardChair()
    {
        List<EBoard> clubEBoardChair = getDBClubEboardMembers();
        return clubEBoardChair;
    }
}
