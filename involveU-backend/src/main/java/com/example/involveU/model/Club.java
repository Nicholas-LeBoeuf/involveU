package com.example.involveU.model;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
public class Club {


    private int clubID;
    private String clubName;
    private String clubAffiliation;
    private String clubBio;
    private String clubVision;

    private String clubMission;
    private String clubValues;
    private String clubLogo;
    private int ownerID;
    private int advisorID;



    private MultipartFile file;


    public int getClubID() {
        return clubID;
    }

    public void setClubID(int clubID) {
        this.clubID = clubID;
    }

    public String getClubName() { return clubName; }

    public void setClubName(String clubName) {
        this.clubName = clubName;
    }

    public String getClubAffiliation() {
        return clubAffiliation;
    }

    public void setClubAffiliation(String clubAffiliation) {
        this.clubAffiliation = clubAffiliation;
    }

    public String getClubBio() {
        return clubBio;
    }

    public void setClubBio(String clubBio) {
        this.clubBio = clubBio;
    }

    public String getClubVision() {
        return clubVision;
    }

    public void setClubVision(String clubVision) {
        this.clubVision = clubVision;
    }
    public String getClubMission() {
        return clubMission;
    }

    public void setClubMission(String clubMission) {
        this.clubMission = clubMission;
    }

    public String getClubValues() {
        return clubValues;
    }

    public void setClubValues(String clubValues) {
        this.clubValues = clubValues;
    }

    public String getClubLogo() {return clubLogo;}

    public void setClubLogo(String clubLogo) {
        this.clubLogo = clubLogo;
    }

    public int getOwnerID() {
        return ownerID;
    }
    public void setOwnerID(int ownerID) {
        this.ownerID = ownerID;
    }
    public int getAdvisorID() {
        return advisorID;
    }

    public void setAdvisorID(int advisorID) {
        this.advisorID = advisorID;
    }

    public MultipartFile getFile() {return file;}

    public void setFile(MultipartFile file) {this.file = file;}
}
