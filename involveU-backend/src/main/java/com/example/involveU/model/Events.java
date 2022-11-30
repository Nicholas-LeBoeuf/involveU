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

    private String clubName;

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

    public void setEventDate(String eventDate) {

        this.eventDate = eventDate;

    }

    public String getEventDesc() {return eventDesc;}

    public void setEventDesc(String eventDesc) {this.eventDesc = eventDesc;}

    public int getIsTransportation() {return isTransportation;}

    public void setIsTransportation(int isTransportation) {this.isTransportation = isTransportation;}

    public String getTicketLink() {return ticketLink;}

    public void setTicketLink(String ticketLink) {this.ticketLink = ticketLink;}

    public String getClubName() {return clubName;}

    public void setClubName(String clubName) {this.clubName = clubName;}

    public int getClubID() {return clubID;}

    public void setClubID(int clubID) {this.clubID = clubID;}

    public void milTimeToReg(String str)
    {
        String finalTime;
        int h1 = (int)str.charAt(0) - '0';
        int h2 = (int)str.charAt(1)- '0';

        int hh = h1 * 10 + h2;

        // Finding out the Meridien of time
        // ie. AM or PM
        String Meridien;
        if (hh < 12) {
            Meridien = "AM";
        }
        else
            Meridien = "PM";

        hh %= 12;

        // Handle 00 and 12 case separately
        if (hh == 0) {
            finalTime = "12";

            // Printing minutes and seconds
            for (int i = 2; i < 8; ++i) {
               finalTime += str.charAt(i);
            }
        }
        else {
            finalTime = String.valueOf(hh);
            // Printing minutes and seconds
            for (int i = 2; i < 8; ++i) {
                finalTime += str.charAt(i);
            }
        }

        // After time is printed
        // cout Meridien
        finalTime += " "+Meridien;


    }

}