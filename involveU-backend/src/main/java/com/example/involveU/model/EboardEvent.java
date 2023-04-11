package com.example.involveU.model;



public class EboardEvent extends Events {

    int numOfRsvps;


    public int getNumOfRsvps() {
        return numOfRsvps;
    }

    public void setNumOfRsvps(int numOfRsvps) {
        this.numOfRsvps = numOfRsvps;
    }

    public void convertEventClass(Events oldEvent)
    {
        this.setEventID(oldEvent.getEventID());
        this.setTitle(oldEvent.getTitle());
        this.setLocation(oldEvent.getLocation());
        this.setStartDateTime(oldEvent.getStartDateTime());
        this.setEndDateTime(oldEvent.getEndDateTime());
        this.setDescription(oldEvent.getDescription());
        this.setIsTransportation(oldEvent.getIsTransportation());
        this.setTicketLink(oldEvent.getTicketLink());
        this.setClubName(oldEvent.getClubName());
        this.setClubID(oldEvent.getClubID());
        this.setDateTimeFormatted(oldEvent.getDateTimeFormatted());
    }
}
