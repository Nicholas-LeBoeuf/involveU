package com.example.involveU.model;

public class Announcement {

    int announcementID;
    int clubID;
    String clubName;
   String contentOfAnnouncement;
   String announcementTitle;
   String  expiresOn;
    String postedOn;

    public int getAnnouncementID() {
        return announcementID;
    }

    public void setAnnouncementID(int announcementID) {
        this.announcementID = announcementID;
    }

    public int getClubID() {
        return clubID;
    }

    public void setClubID(int clubID) {
        this.clubID = clubID;
    }

    public String getContentOfAnnouncement() {
        return contentOfAnnouncement;
    }

    public void setContentOfAnnouncement(String contentOfAnnouncement) {
        this.contentOfAnnouncement = contentOfAnnouncement;
    }

    public String getAnnouncementTitle() {
        return announcementTitle;
    }

    public void setAnnouncementTitle(String announcementTitle) {
        this.announcementTitle = announcementTitle;
    }

    public String getExpiresOn() {
        return expiresOn;
    }

    public void setExpiresOn(String expiresOn) {
        this.expiresOn = expiresOn;
    }
    public String getPostedOn() {return postedOn;}
    public void setPostedOn(String postedOn) {this.postedOn = postedOn;}

    public String getClubName() {
        return clubName;
    }

    public void setClubName(String clubName) {
        this.clubName = clubName;
    }
}
