import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AssignRemoveAdvisor} from "../../objects/assignRemoveAdvisor";
import {AdminService} from "../../services/admin.service";
import {DropdownModule} from 'primeng/dropdown';
import {Club} from "../../objects/club";
import {ClubService} from "../../services/club.service";

@Component({
  selector: 'app-assign-remove-advisor',
  templateUrl: './assign-remove-advisor.component.html',
  styleUrls: ['./assign-remove-advisor.component.scss']
})
export class AssignRemoveAdvisorComponent implements OnInit {
  // @ts-ignore
  removeAdvisorForm : FormGroup;
  assignAdvisorForm : FormGroup;
  // @ts-ignore
  constructor(private formBuilder : FormBuilder,
              private adminService: AdminService,
              private clubService: ClubService) {
    this.assignAdvisorForm = this.formBuilder.group({
      clubName: ['', Validators.required],
      advisorID: ['', Validators.required]
    });

  }
  // @ts-ignore
  constructor(private formBuilder : FormBuilder) {
    this.removeAdvisorForm = this.formBuilder.group({
      clubName: ['', Validators.required],
      advisorID: ['', Validators.required]
    });

  }

  get assignAdvisorFormInputs() {
    return this.assignAdvisorForm.controls;
  }

  get removeAdvisorFormInputs() {
    return this.assignAdvisorForm.controls;
  }

  assignAdvisorSubmit(){
    const assignAdvisor : AssignRemoveAdvisor = {clubName: this.assignAdvisorForm.value.clubName, advisorID: this.assignAdvisorForm.value.advisorID}
    console.log(assignAdvisor);
    this.adminService.assignNewAdvisor(assignAdvisor).subscribe(success =>{
        console.log(success);
      },
      (error) => {
        console.log(error);
      });
  }

  removeAdvisorSubmit(){
    const removeAdvisor : AssignRemoveAdvisor = {clubName: this.assignAdvisorForm.value.clubName, advisorID: this.assignAdvisorForm.value.advisorID}
    console.log(removeAdvisor);
    this.adminService.removeAdvisor(removeAdvisor).subscribe(success =>{
        console.log(success);
      },
      (error) => {
        console.log(error);
      });
  }

  clubNames = [
    {name : 'CAPE'}
  ]

  ngOnInit(): void {
  }
}
