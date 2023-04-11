import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {ClubService} from "../../services/club.service";
import {AdminService} from "../../services/admin.service";
import {Club} from "../../objects/club";
import {User} from "../../objects/user";
import {CookieService} from "ngx-cookie-service";
import {Announcement} from "../../objects/announcements";
import { DatePipe } from '@angular/common';
import {Title} from "@angular/platform-browser";
import {ResponsiveService} from "../../services/responsive.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  //initializing all forms
  createUserForm: FormGroup;
  deleteUserForm: FormGroup;
  createClubForm : FormGroup;
  deleteClubForm: FormGroup;
  assignAdvisorForm : FormGroup;
  osiAnnouncementForm : FormGroup;
  removeEBoardForm : FormGroup;
  addEBoardForm : FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private clubService: ClubService,
              public responsiveService: ResponsiveService,
              private adminService: AdminService,
              public cookie: CookieService,
              private datePipe: DatePipe,
              private title: Title,
              private toastr: ToastrService) {
    this.title.setTitle("involveU | Admin")
    //setting all variable names in each form (Lines 42-90)
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

    this.deleteClubForm = this.formBuilder.group({
      clubID: ['', Validators.required]
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

    this.osiAnnouncementForm = this.formBuilder.group({
      clubID: [''],
      contentOfAnnouncement: ['', Validators.required],
      expiresOn: ['', Validators.required],
      announcementTitle: ['', Validators.required],
      postedOn: ['']
    });
    this.todaysDate = this.datePipe.transform(this.todaysDate, 'yyyy-MM-dd');
  }

  //BOOLEANS
  clubLogoUploaded: boolean = false;
  assign: boolean = true;
  disableUserDropdown: boolean = true;
  isUserAdmin: boolean = false;

  //NUMBERS
  clubID!: number;

  //STRINGS


  //OBJECTS
  clubNames: Club[] = [];
  userList: User[] = [];
  nonEboardList: User[] = [];
  eboardList: User[] = [];
  advisorList: User[] = [];
  clubEboard: User[] = [];
  selectedClub: any = {};
  yearNames = [
    { yearName: 'Freshman' },
    { yearName: 'Sophomore' },
    { yearName: 'Junior' },
    { yearName: 'Senior' },
    { yearName: 'Faculty' },
  ]

  //FORM CONTROLS
  addEBoardClubID: FormControl = new FormControl(null, Validators.required);
  removeEBoardClubID: FormControl = new FormControl(null, Validators.required);
  removeClubID: FormControl = new FormControl(null, Validators.required);
  assignAdvisorClubID: FormControl = new FormControl(null, Validators.required);
  deleteUserID: FormControl = new FormControl(null, Validators.required);
  nonEboardID: FormControl = new FormControl(null, Validators.required);
  eboardID: FormControl = new FormControl(null, Validators.required);
  advisorID: FormControl = new FormControl(null, Validators.required);
  createClubAdvisorID: FormControl = new FormControl(null, Validators.required);
  todaysDate = new Date().toString();
  yearNameFC: FormControl = new FormControl(null, Validators.required);


  ngOnInit(): void {
    this.fillClubList();
    this.fillUserList();
    this.fillNonEboardList();
    this.fillEboardList();
    this.fillAdvisorList();
    this.getEboardMembers();

    if(+this.cookie.get('isAdmin') === 1) {
      this.isUserAdmin = true;
    }
    else {
      this.isUserAdmin = false;
    }
  }
  onUpload(event) {
    const file:File = event.files[0];

    this.adminService.sendImage(file).subscribe(response => {

    },
      error => {
        this.toastr.error('Unsuccessful Club Logo Upload', undefined, {positionClass: 'toast-top-center', progressBar: true});
      },
      () => {
        this.toastr.success('Successfully Uploaded Club Logo', undefined, {positionClass: 'toast-top-center', progressBar: true});
        this.clubLogoUploaded = true;
      });

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
  //Grabs all users that are eBoard members of clubs
  fillEboardList() {
    this.adminService.getAllEboard().subscribe((response: User[]) => {
        this.eboardList = response;
      },
      (error) => {
        console.log(error)
      });
  }
  //Grabs all users that are not currently eBoard members
  fillNonEboardList() {
    this.adminService.getAllNonEboard().subscribe((response: User[]) => {
      this.nonEboardList = response;
    },
      (error) => {
      console.log(error)
      });
  }
  //Grabs all users with faculty accounts
  fillAdvisorList() {
    this.userService.getAllFaculty().subscribe((response: User[]) => {
        this.advisorList = response;
      },
      (error) => {
        console.log(error)
      });
  }

  createClubSubmit(){
    const clubInfo : Club = {ownerID: this.cookie.get('studentID'), clubName: this.createClubForm.value.clubName, clubAffiliation: this.createClubForm.value.clubAffiliation, clubBio: this.createClubForm.value.clubBio, clubVision: this.createClubForm.value.clubVision, clubMission: this.createClubForm.value.clubMission, clubValues: this.createClubForm.value.clubValues, clubLogo: this.createClubForm.value.clubLogo, advisorID: this.createClubAdvisorID.value}

    this.adminService.insertNewClub(clubInfo).subscribe(success =>{

      },
      error => {
        this.toastr.error('Unsuccessful Club Creation Attempt', undefined, {positionClass: 'toast-top-center', progressBar: true});
      },
      () => {
        this.toastr.success('Successfully Created Club', undefined, {positionClass: 'toast-top-center', progressBar: true});
        this.createClubForm.reset();
        this.createClubAdvisorID.reset();
        this.fillClubList();
        this.clubLogoUploaded = false;
      });
  }

  createUserSubmit(){
    const newUser: User = { firstName: this.createUserForm.value.firstName, lastName: this.createUserForm.value.lastName, year: this.yearNameFC.value, email: this.createUserForm.value.email, isAdmin: 0, isEboard: 0, pronouns: this.createUserForm.value.pronouns, userPassword: this.createUserForm.value.password};
    this.adminService.createUser(newUser).subscribe(success =>{

      },
      error => {
        this.toastr.error('Unsuccessful User Creation Attempt', undefined, {positionClass: 'toast-top-center', progressBar: true});
      },
      () => {
        this.toastr.success('Successfully Created User', undefined, {positionClass: 'toast-top-center', progressBar: true});
        this.createUserForm.reset();
        this.yearNameFC.reset();
        this.fillUserList();
      });
  }

  deleteUserSubmit(){
    this.adminService.deleteUser(this.deleteUserID.value).subscribe(success =>{

      },
      error => {
        this.toastr.error('Unsuccessful User Deletion Attempt', undefined, {positionClass: 'toast-top-center', progressBar: true});
      },
      () => {
        this.toastr.success('Successfully Deleted User', undefined, {positionClass: 'toast-top-center', progressBar: true});
        this.deleteUserID.reset();
        this.fillUserList();
      });
  }

  deleteClubSubmit(){
    this.adminService.deleteClub(this.removeClubID.value).subscribe(success =>{

      },
      error => {
        this.toastr.error('Unsuccessful Club Deletion Attempt', undefined, {positionClass: 'toast-top-center', progressBar: true});
      },
      () => {
        this.toastr.success('Successfully Deleted Club', undefined, {positionClass: 'toast-top-center', progressBar: true});
        this.removeClubID.reset();
        this.fillClubList();
      });
  }

  addEBoardSubmit(){
    this.adminService.addEBoardMember(this.nonEboardID.value, this.addEBoardClubID.value, this.addEBoardForm.value.role).subscribe(success =>{

      },
      error => {
        this.toastr.error('Unsuccessful Eboard Addition Attempt', undefined, {positionClass: 'toast-top-center', progressBar: true});
      },
      () => {
        this.toastr.success('Successfully Assigned Eboard Position', undefined, {positionClass: 'toast-top-center', progressBar: true});
        this.nonEboardID.reset();
        this.addEBoardClubID.reset();
        this.addEBoardForm.reset();
      });
  }

  removeEBoardSubmit(){
    this.adminService.removeEBoardMember(this.eboardID.value).subscribe(success =>{

      },
      error => {
        this.toastr.error('Unsuccessful Eboard Deletion Attempt', undefined, {positionClass: 'toast-top-center', progressBar: true});
      },
      () => {
        this.toastr.success('Successfully Removed Eboard Member', undefined, {positionClass: 'toast-top-center', progressBar: true});
        this.eboardID.reset();
        this.removeEBoardClubID.reset();
      });
  }

  assignAdvisorSubmit(){
    this.adminService.assignNewAdvisor(this.advisorID.value, this.assignAdvisorClubID.value).subscribe(response =>{
      },
      error => {
        this.toastr.error('Unsuccessful Assign Advisor Attempt', undefined, {positionClass: 'toast-top-center', progressBar: true});
      },
      () => {
        this.toastr.success('Successfully Assigned Advisor', undefined, {positionClass: 'toast-top-center', progressBar: true});
        this.advisorID.reset();
        this.assignAdvisorClubID.reset();
        this.fillAdvisorList();
      });
  }
  //We set the clubID to 275 since that corresponds to OSI in the database
  createOSIAnnouncementSubmit(){
    const newAnnouncement: Announcement = {clubID: 275, contentOfAnnouncement: this.osiAnnouncementForm.value.contentOfAnnouncement, expiresOn: this.osiAnnouncementForm.value.expiresOn, announcementTitle: this.osiAnnouncementForm.value.announcementTitle, postedOn: this.todaysDate};

    this.adminService.createOSIAnnouncement(newAnnouncement).subscribe(success =>{

      },
      error => {
        this.toastr.error('Unsuccessful Announcement Creation Attempt', undefined, {positionClass: 'toast-top-center', progressBar: true});
      },
      () => {
        this.toastr.success('Successfully Created Announcement', undefined, {positionClass: 'toast-top-center', progressBar: true});
        this.osiAnnouncementForm.reset();
      });
  }

  getEboardMembers()
  {
    this.clubService.getClubEboard(this.removeEBoardClubID.value).subscribe(response => {
      this.clubEboard = response;
      this.clubEboard.forEach(member => {
          member.firstName = member.firstName + ' ' + member.lastName;
        }
      );
    })
  }
  //Checks if a club is selected, if so, user dropdown get enabled, if not, stays disabled
  checkClubSelected() {
    if(this.selectedClub!=='Select Club'){
      this.disableUserDropdown = false;
      this.getEboardMembers();
    }
    else {
      this.disableUserDropdown = true;
    }
  }

  isCreateClubValid() {
    if (this.createClubForm.value.clubName === '' || this.createClubForm.value.clubAffiliation === '' ||  this.createClubForm.value.clubBio === '' ||  this.createClubForm.value.clubVision === '' ||  this.createClubForm.value.clubMission === '' ||  this.createClubForm.value.clubValues === '' || this.createClubAdvisorID.value === null  || this.clubLogoUploaded === false) {
      return true;
    }
    else {
      return false;
    }
  }
  //Checks if all required inputs in the form have data (Lines 362-423)
  isCreateUserValid() {
    if (this.createUserForm.value.firstName === '' || this.createUserForm.value.lastName === '' || this.createUserForm.value.email === '' || this.createUserForm.value.password === '' || this.yearNameFC.value === null || this.createUserForm.value.pronouns === '') {
      return true;
    }
    else {
      return false;
    }
  }

  isDeleteUserValid() {
    if (this.deleteUserID.value === null) {
      return true;
    }
    else {
      return false;
    }
  }

  isDeleteClubValid() {
    if (this.removeClubID.value === null) {
      return true;
    }
    else {
      return false;
    }
  }

  isAssignEboardValid() {
    if (this.nonEboardID.value === null || this.addEBoardClubID.value === null || this.addEBoardForm.value.role === '') {
      return true;
    }
    else {
      return false;
    }
  }

  isAssignAdvisorValid() {
    if (this.assignAdvisorClubID.value === null || this.advisorID.value === null) {
      return true;
    }
    else {
      return false;
    }
  }

  isRemoveEboardValid() {
    if (this.eboardID.value === null || this.removeEBoardClubID === null) {
      return true;
    }
    else {
      return false;
    }
  }

  isOSIAnnouncementValid() {
    if(this.osiAnnouncementForm.value.announcementTitle === '' || this.osiAnnouncementForm.value.contentOfAnnouncement === '' || this.osiAnnouncementForm.value.expiresOn === null || this.osiAnnouncementForm.value.postedOn === null) {
      return true;
    }
    else {
      return false;
    }
  }
}
