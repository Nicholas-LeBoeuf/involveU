import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {ClubService} from "../../services/club.service";
import {Club} from "../../objects/club";
import {User} from "../../objects/user";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  createClubForm : FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private clubService: ClubService ) {
    this.createClubForm = this.formBuilder.group({
      clubName: ['', Validators.required],
      clubAffiliation: ['', Validators.required],
      clubBio: ['', Validators.required],
      clubVision: ['', Validators.required],
      clubAdvisor: ['', Validators.required],
      clubLogo: ['']
    });
  }
  createClubMessage: boolean = false;

  loggedInUser: User = new class implements User {
    email: string = "";
    firstName: string = "";
    isAdmin: number = -1;
    isEboard: number = -1;
    lastName: string = "";
    pronouns: string = "";
    studentID: number = -1;
    userPassword: string = "";
    year: string = "";
  };
  get clubCreationFormInputs() {
    return this.createClubForm.controls;
  }

  createClubSubmit() {
    // @ts-ignore
    const clubInfo : Club = {ownerID: this.loggedInUser.studentID, clubName: this.createClubForm.value.clubName, clubAffiliation: this.createClubForm.value.clubAffiliation, clubBio: this.createClubForm.value.clubBio, clubVision: this.createClubForm.value.clubVision, clubAdvisor: this.createClubForm.value.clubAdvisor, clubLogo: this.createClubForm.value.clubLogo}
    this.clubService.insertNewClub(clubInfo);
    console.warn('Your club has been created');
    location.reload();
    this.createClubMessage = true;
  }

  ngOnInit(): void {
  }

}
