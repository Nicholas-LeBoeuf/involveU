import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {ClubService} from "../../services/club.service";
import {AdminService} from "../../services/admin.service";
import {Club} from "../../objects/club";
import {User} from "../../objects/user";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  createUserForm: FormGroup;
  deleteUserForm: FormGroup;
  createClubForm : FormGroup;
  assignAdvisorForm : FormGroup;
  clubNames: Club[] = [];
  userList: User[] = [];
  nonEboardList: User[] = [];
  assign: boolean = true;
  removeEBoardForm : FormGroup;
  addEBoardForm : FormGroup;

  addEBoardClubID: FormControl = new FormControl(null);
  removeEBoardClubID: FormControl = new FormControl(null);
  assignAdvisorClubID: FormControl = new FormControl(null);
  deleteUserID: FormControl = new FormControl(null);
  nonEboardID: FormControl = new FormControl(null);

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private clubService: ClubService,
              public cookie: CookieService,
              private adminService: AdminService) {
    this.createClubForm = this.formBuilder.group({
      clubName: ['', Validators.required],
      clubAffiliation: ['', Validators.required],
      clubBio: ['', Validators.required],
      clubVision: ['', Validators.required],
      clubMission: ['', Validators.required],
      clubValues: ['', Validators.required],
      advisorID: ['', Validators.required],
      clubLogo: ['']
    });

    this.createUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['',  Validators.required],
      year: ['', Validators.required],
      pronouns: ['', Validators.required],
      isAdmin: [''],
      isEboard: ['']
    });

    this.deleteUserForm = this.formBuilder.group({
      userID: ['', Validators.required]
    })

    this.assignAdvisorForm = this.formBuilder.group({
      advisorID: ['', Validators.required]
    });

    this.addEBoardForm = this.formBuilder.group({
      userID: ['', Validators.required],
      role: ['', Validators.required]
    });

    this.removeEBoardForm = this.formBuilder.group({
      userID: ['', Validators.required]
    });
  }
  createClubMessage: boolean = false;
  createClubFailed: boolean = false;
  createUserSuccess: boolean = false;
  createUserFailed: boolean = false;
  deleteUserSuccess: boolean = false;
  deleteUserFailed: boolean = false;
  assignAdvisorSuccess: boolean = false;
  assignAdvisorFailed: boolean = false;
  assignEboardSuccess: boolean = false;
  assignEboardFailed: boolean = false;
  removeEboardSuccess: boolean = false;
  removeEboardFailed: boolean = false;

  ngOnInit(): void {
    this.fillClubList();
    this.fillUserList();
    this.fillNonEboardList();
  }

  fillClubList() {
    this.clubService.getAllClubs().subscribe((response: Club[]) => {
        this.clubNames = response;
      },
      (error) => {
        console.log(error)
      });
  }

  fillUserList() {
    this.userService.getAllUsers().subscribe((response: User[]) => {
        this.userList = response;
      },
      (error) => {
        console.log(error)
      });
  }

  fillNonEboardList() {
    this.adminService.getAllNonEboard().subscribe((response: User[]) => {
      this.nonEboardList = response;
    },
      (error) => {
      console.log(error)
      });
  }

  get clubCreationFormInputs() {
    return this.createClubForm.controls;
  }

  get createUserFormInputs() {
    return this.createUserForm.controls;
  }

  get deleteUserFormInputs() {
    return this.deleteUserForm.controls;
  }

  get assignAdvisorFormInputs() {
    return this.assignAdvisorForm.controls;
  }

  get addEBoardFormInputs() {
    return this.addEBoardForm.controls;
  }

  get removeEBoardFormInputs() {
    return this.removeEBoardForm.controls;
  }

  createClubSubmit(){
    const clubInfo : Club = {ownerID: this.cookie.get('studentID'), clubName: this.createClubForm.value.clubName, clubAffiliation: this.createClubForm.value.clubAffiliation, clubBio: this.createClubForm.value.clubBio, clubVision: this.createClubForm.value.clubVision, clubMission: this.createClubForm.value.clubMission, clubValues: this.createClubForm.value.clubValues, clubLogo: this.createClubForm.value.clubLogo, advisorID: this.createClubForm.value.advisorID}
    console.log(clubInfo);
    this.adminService.insertNewClub(clubInfo).subscribe(success =>{
        this.createClubMessage = true;
        console.log(success);
      },
      (error) => {
        this.createClubFailed = true;
        console.log(error)
      });
  }

  createUserSubmit(){
    const newUser: User = { firstName: this.createUserForm.value.firstName, lastName: this.createUserForm.value.lastName, year: this.createUserForm.value.year, email: this.createUserForm.value.email, isAdmin: 0, isEboard: 0, pronouns: this.createUserForm.value.pronouns, userPassword: this.createUserForm.value.password};
    this.adminService.createUser(newUser).subscribe(success =>{
        this.createUserSuccess = true;
        console.log(newUser);
        console.log(success);
      },
      (error) => {
        this.createUserFailed = true;
        console.log(error);
      });
  }

  deleteUserSubmit(){
    this.adminService.deleteUser(this.deleteUserID.value).subscribe(success =>{
        console.log(success);
        console.log(this.deleteUserID.value);
        this.deleteUserSuccess = true;
      },
      (error) => {
        console.log(error);
        this.deleteUserFailed = true;
      });
  }

  addEBoardSubmit(){
    this.adminService.addEBoardMember(this.nonEboardID.value, this.addEBoardClubID.value, this.addEBoardForm.value.role).subscribe(success =>{
        console.log(success);
        this.assignEboardSuccess = true;
      },
      (error) => {
        this.assignEboardFailed = true;
        console.log(error);
      });
    console.log(this.nonEboardID.value, this.addEBoardClubID.value, this.addEBoardForm.value.role)
  }

  removeEBoardSubmit(){
    this.adminService.removeEBoardMember(this.removeEBoardForm.value.userID).subscribe(success =>{
        console.log(success);
        this.removeEboardSuccess = true;
      },
      (error) => {
        console.log(error);
        this.removeEboardFailed = true;
      });
    console.log(this.removeEBoardForm.value.userID)
  }

  assignAdvisorSubmit(){
    this.adminService.assignNewAdvisor(this.assignAdvisorForm.value.advisorID, this.assignAdvisorClubID.value).subscribe(success =>{
        console.log(success);
        this.assignAdvisorSuccess = true;
      },
      (error) => {
        console.log(error);
        this.assignAdvisorFailed = true;
      });
    console.log(this.assignAdvisorForm.value.advisorID, this.assignAdvisorClubID.value)
  }
}
