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
    private int isAdmin;
    @Column(name = "isEboard")
    private int isEboard;
    @Column(name = "pronouns")
    private String pronouns;

    @Column(name = "userPassword")
    private String userPassword;

    public long getStudentID() {return studentID;}

    public void setStudentID(long studentID) {this.studentID = studentID;}
    public String getFirstName() {return firstName;}

    public void setFirstName(String dbFirstName) {firstName = dbFirstName;}

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String dbLastName) {lastName = dbLastName;}

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

    public int getIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(int dbAdmin) {
        isAdmin = dbAdmin;
        System.out.println(isAdmin);
    }

    public int getIsEboard() {
        return isEboard;
    }

    public void setIsEboard(int dbEboard) {isEboard = dbEboard;}

    public String getPronouns() {
        return pronouns;
    }

    public void setPronouns(String dbPronouns) {
        pronouns = dbPronouns;
    }

    public String getUserPassword() {return userPassword;}

    public void setUserPassword(String userPassword) {this.userPassword = userPassword;}
}
