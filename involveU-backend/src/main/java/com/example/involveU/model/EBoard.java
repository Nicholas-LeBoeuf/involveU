package com.example.involveU.model;

import javax.persistence.*;

@Entity
@Table(name = "eboard")
public class EBoard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long eboardID;
    @Column(name = "clubID")
    private  int clubID;
    @Column(name = "studentID")
    private  int studentID;
    @Column(name = "eboardPosition")
    private  String eboardPosition;
}
