package com.example.involveU.model;

import javax.persistence.*;

@Entity
@Table(name = "events")
public class Events {
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
}
