import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AssignRemoveAdvisor} from "../../objects/assignRemoveAdvisor";
import {AdminService} from "../../services/admin.service";
import {DropdownModule} from 'primeng/dropdown';
import {Club} from "../../objects/club";
import {ClubService} from "../../services/club.service";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-assign-remove-advisor',
  templateUrl: './assign-remove-advisor.component.html',
  styleUrls: ['./assign-remove-advisor.component.scss']
})
export class AssignRemoveAdvisorComponent implements OnInit {

  removeAdvisorForm : FormGroup;
  assignAdvisorForm : FormGroup;
  clubNames: Club[] = [];
  assign: boolean = true;

  assignAdvisorClubID: FormControl = new FormControl(null);

  constructor(private formBuilder : FormBuilder,
              private adminService: AdminService,
              private clubService: ClubService) {
    this.assignAdvisorForm = this.formBuilder.group({
      advisorID: ['', Validators.required]
    });

    this.removeAdvisorForm = this.formBuilder.group({
      clubName: ['', Validators.required],
      advisorID: ['', Validators.required]
    });
  }

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

  get removeAdvisorFormInputs() {
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

  /*removeAdvisorSubmit(){
    const removeAdvisor : AssignRemoveAdvisor = {clubID: this.removeAdvisorForm.value.clubNames.clubID, advisorID: this.removeAdvisorForm.value.advisorID}
    console.log(removeAdvisor);
    this.adminService.removeAdvisor(removeAdvisor).subscribe(success =>{
        console.log(success);
      },
      (error) => {
        console.log(error);
      });
  }*/
}
