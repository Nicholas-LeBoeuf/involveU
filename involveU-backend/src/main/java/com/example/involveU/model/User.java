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
    @Column(name = "email")
    private String email;
    @Column(name = "isAdmin")
    private Boolean isAdmin;
    @Column(name = "isEboard")
    private Boolean isEboard;
    @Column(name = "pronouns")
    private String pronouns;

    public String getFirstName() {return firstName;}

    public void setFirstName(String dbFirstName) {firstName = dbFirstName;}

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String dbLastName) {
        lastName = lastName;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String dbYear) {
        year = dbYear;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String dbEmail) {
        email = dbEmail;
    }

    public Boolean getAdmin() {
        return isAdmin;
    }

    public void setAdmin(int dbAdmin) {
        if(dbAdmin == 1) {isAdmin = true;}
        else if (dbAdmin == 0) {isAdmin = false;}
        //If the there an error in user creation then the default set value is false.
        else{ isAdmin = false;}


    }

    public Boolean getEboard() {
        return isEboard;
    }

    public void setEboard(int dbEboard) {

        if(dbEboard == 1) {isEboard = true;}
        else if (dbEboard == 0) {isEboard = false;}
        //If the there an error in user creation then the default set value is false.
        else{isEboard = false;}

    }

    public String getPronouns() {
        return pronouns;
    }

    public void setPronouns(String dbPronouns) {
        pronouns = pronouns;
    }
}
