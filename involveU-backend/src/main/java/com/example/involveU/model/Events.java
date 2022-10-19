package com.example.involveU.model;

import javax.persistence.*;

@Entity
@Table(name = "events")
public class Events extends Club{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long eventID;
    @Column(name = "eventName")
    private  String eventName;
    @Column(name = "eventLocation")
    private  String eventLocation;
    @Column(name = "startTime")
    private  String startTime;
    @Column(name = "endTime")
    private  String endTime;
    @Column(name = "eventDate")
    private  String eventDate;
    @Column(name = "eventDesc")
    private  String eventDesc;
    @Column(name = "isTransportation")
    private  int isTransportation;
    @Column(name = "ticketLink")
    private  String ticketLink;
    @Column(name = "clubID")
    private  int clubID;

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