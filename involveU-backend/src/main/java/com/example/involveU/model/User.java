package com.example.involveU.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;
import javax.persistence.Id;

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long studentID;
    @Column(name = "firstName")
    private  String firstName;
    @Column(name = "lastName")
    private String lastName;
    @Column(name = "year")
    private String year;
    @Column(name = "Email")
    private String email;
    @Column(name = "isAdmin")
    private int isAdmin;
    @Column(name = "isEboard")
    private int isEboard;
    @Column(name = "Pronouns")
    private String Pronouns;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String Year) {
        year = Year;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getAdmin() {
        return isAdmin;
    }

    public void setAdmin(int admin) {
        isAdmin = admin;
    }

    public Integer getEboard() {
        return isEboard;
    }

    public void setEboard(int eboard) {
        isEboard = eboard;
    }

    public String getPronouns() {
        return Pronouns;
    }

    public void setPronouns(String pronouns) {
        Pronouns = pronouns;
    }
}
