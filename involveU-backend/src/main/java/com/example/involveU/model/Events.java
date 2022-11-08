package com.example.involveU.model;

import javax.persistence.*;


public class Events{


    private long eventID;

    private  String eventName;

    private  String eventLocation;

    private  String startTime;

    private  String endTime;

    private  String eventDate;

    private  String eventDesc;

    private  int isTransportation;

    private  String ticketLink;

    private  int clubID;
    public long getEventID() {
        return eventID;
    }

    public void setEventID(long eventID) {
        this.eventID = eventID;
    }

    public String getEventName() {return eventName;}

    public void setEventName(String eventName) {this.eventName = eventName;}

    public String getEventLocation() {return eventLocation;}

    public void setEventLocation(String eventLocation) {this.eventLocation = eventLocation;}

    public String getStartTime() {return startTime;}

    public void setStartTime(String startTime) {this.startTime = startTime;}

    public String getEndTime() {return endTime;}

    public void setEndTime(String endTime) {this.endTime = endTime;}

    public String getEventDate() {return eventDate;}

    public void setEventDate(String eventDate) {this.eventDate = eventDate;}

    public String getEventDesc() {return eventDesc;}

    public void setEventDesc(String eventDesc) {this.eventDesc = eventDesc;}

    public int getIsTransportation() {return isTransportation;}

    public void setIsTransportation(int isTransportation) {this.isTransportation = isTransportation;}

    public String getTicketLink() {return ticketLink;}

    public void setTicketLink(String ticketLink) {this.ticketLink = ticketLink;}

    public int getClubID() {return clubID;}

    public void setClubID(int clubID) {this.clubID = clubID;}
}