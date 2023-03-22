
package com.example.involveU.model; 

public class Events{

    private long eventID;

    private  String title;

    private  String location;

    private  String startDateTime;

    private  String endDateTime;

    private  String dateTimeFormatted;

    private  String description;

    private  int isTransportation;

    private  String ticketLink;

    private String clubName;
    private String spaceName;
    private  int space_ID;
    private int location_ID;
    private  int clubID;
    private ExtraCustomField[] customFields;
    public long getEventID() {
        return eventID;
    }

    public void setEventID(long eventID) {
        this.eventID = eventID;
    }

    public String getTitle() {return title;}

    public void setTitle(String title) {this.title = title;}

    public String getLocation() {return location;}

    public void setLocation(String location) {this.location = location;}

    public String getStartDateTime() {return startDateTime;}

    public void setStartDateTime(String startDateTime) {this.startDateTime = startDateTime;}

    public String getEndDateTime() {return endDateTime;}

    public void setEndDateTime(String endDateTime) {this.endDateTime = endDateTime;}

    public String getDateTimeFormatted() {return dateTimeFormatted;}

    public void setDateTimeFormatted(String dateTimeFormatted) {

        this.dateTimeFormatted = dateTimeFormatted;

    }

    public String getDescription() {return description;}

    public void setDescription(String description) {this.description = description;}

    public int getIsTransportation() {return isTransportation;}

    public void setIsTransportation(int isTransportation) {this.isTransportation = isTransportation;}

    public String getTicketLink() {return ticketLink;}

    public void setTicketLink(String ticketLink) {this.ticketLink = ticketLink;}

    public String getClubName() {return clubName;}

    public void setClubName(String clubName) {this.clubName = clubName;}

    public int getClubID() {return clubID;}

    public void setClubID(int clubID) {this.clubID = clubID;}

    public String getSpaceName() {return spaceName;}

    public void setSpaceName(String spaceName) {this.spaceName = spaceName;}

    public int getSpace_ID() {return space_ID;}

    public void setSpace_ID(int space_ID) {this.space_ID = space_ID;}

    public int getLocation_ID() {return location_ID;}

    public void setLocation_ID(int location_ID) {this.location_ID = location_ID;}

    public ExtraCustomField[] getCustomFields() {return customFields;}

    public void setCustomFields(ExtraCustomField[] customFields) {
        this.customFields = customFields;
    }
}