import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {ClubService} from "../../services/club.service";
import {AdminService} from "../../services/admin.service";
import {Club} from "../../objects/club";
import {User} from "../../objects/user";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-create-club',
  templateUrl: './create-club-page.component.html',
  styleUrls: ['./create-club-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  createClubForm : FormGroup;

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
  }
  createClubMessage: boolean = false;
  createClubFailed: boolean = false;

  get clubCreationFormInputs() {
    return this.createClubForm.controls;
  }

  createClubSubmit() {
    // @ts-ignore
    const clubInfo : Club = {ownerID: this.cookie.get('studentID'), clubName: this.createClubForm.value.clubName, clubAffiliation: this.createClubForm.value.clubAffiliation, clubBio: this.createClubForm.value.clubBio, clubVision: this.createClubForm.value.clubVision, clubMission: this.createClubForm.value.clubMission, clubValues: this.createClubForm.value.clubValues, clubLogo: this.createClubForm.value.clubLogo, advisorID: this.createClubForm.value.advisorID}
    console.log(clubInfo);
    this.adminService.insertNewClub(clubInfo).subscribe(success =>{
        this.createClubFailed = false;
        this.createClubMessage = true;
        console.log(success);

      },
      (error) => {
        this.createClubFailed = true;
        console.log(error);

      });
  }

  ngOnInit(): void {
  }

}
