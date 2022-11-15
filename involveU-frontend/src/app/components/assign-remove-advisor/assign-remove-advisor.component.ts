import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../../services/admin.service";
import {Club} from "../../objects/club";
import {ClubService} from "../../services/club.service";

@Component({
  selector: 'app-assign-remove-advisor',
  templateUrl: './assign-remove-advisor.component.html',
  styleUrls: ['./assign-remove-advisor.component.scss']
})
export class AssignRemoveAdvisorComponent implements OnInit {

  constructor(private formBuilder : FormBuilder,
              private adminService: AdminService,
              private clubService: ClubService) {
    this.assignAdvisorForm = this.formBuilder.group({
      advisorID: ['', Validators.required]
    });
  }

  assignAdvisorForm : FormGroup;
  clubNames: Club[] = [];
  assign: boolean = true;
  assignAdvisorClubID: FormControl = new FormControl(null);

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

  get assignAdvisorFormInputs() {
    return this.assignAdvisorForm.controls;
  }

  assignAdvisorSubmit(){
    this.adminService.assignNewAdvisor(this.assignAdvisorForm.value.advisorID, this.assignAdvisorClubID.value).subscribe(success =>{
        console.log(success);
      },
      (error) => {
        console.log(error);
      });
    console.log(this.assignAdvisorForm.value.advisorID, this.assignAdvisorClubID.value)
  }
}
