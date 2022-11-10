import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-assign-remove-advisor',
  templateUrl: './assign-remove-advisor.component.html',
  styleUrls: ['./assign-remove-advisor.component.scss']
})
export class AssignRemoveAdvisorComponent implements OnInit {

  assignAdvisorForm : FormGroup;
  constructor(private formBuilder : FormBuilder) {
    this.assignAdvisorForm = this.formBuilder.group({
      clubName: ['', Validators.required],
      advisorID: ['', Validators.required]
    });

  }

  get assignAdvisorFormInputs() {
    return this.assignAdvisorForm.controls;
  }

  assignAdvisorSubmit(){

  }

  ngOnInit(): void {
  }

}
