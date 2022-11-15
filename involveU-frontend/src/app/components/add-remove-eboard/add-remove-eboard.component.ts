import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Club} from "../../objects/club";
import {AdminService} from "../../services/admin.service";
import {ClubService} from "../../services/club.service";

@Component({
  selector: 'app-add-remove-eboard',
  templateUrl: './add-remove-eboard.component.html',
  styleUrls: ['./add-remove-eboard.component.scss']
})
export class AddRemoveEboardComponent implements OnInit {
  removeEBoardForm : FormGroup;
  addEBoardForm : FormGroup;
  clubNames: Club[] = [];
  assign: boolean = true;

  addEBoardClubID: FormControl = new FormControl(null);
  removeEBoardClubID: FormControl = new FormControl(null);
  constructor(private formBuilder : FormBuilder,
              private adminService: AdminService,
              private clubService: ClubService) {
    this.addEBoardForm = this.formBuilder.group({
      userID: ['', Validators.required],
      role: ['', Validators.required]
  });

    this.removeEBoardForm = this.formBuilder.group({
      userID: ['', Validators.required]
    }); }

  ngOnInit(): void {
    this.fillClubList();
  }

  fillClubList() {
    this.clubService.getAllClubs().subscribe((response: Club[]) => {
        this.clubNames = response;
      },
      (error) => {
        console.log(error)
      });
  }

  get addEBoardFormInputs() {
    return this.addEBoardForm.controls;
  }

  get removeEBoardFormInputs() {
    return this.removeEBoardForm.controls;
  }

  addEBoardSubmit(){
    this.adminService.addEBoardMember(this.addEBoardForm.value.userID, this.addEBoardClubID.value, this.addEBoardForm.value.role).subscribe(success =>{
        console.log(success);
      },
      (error) => {
        console.log(error);
      });
    console.log(this.addEBoardForm.value.userID, this.addEBoardClubID.value, this.addEBoardForm.value.role)
  }

  removeEBoardSubmit(){
    this.adminService.removeEBoardMember(this.removeEBoardForm.value.userID).subscribe(success =>{
        console.log(success);
      },
      (error) => {
        console.log(error);
      });
    console.log(this.removeEBoardForm.value.userID)
  }
}
