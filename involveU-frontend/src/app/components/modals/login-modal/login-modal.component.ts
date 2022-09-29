import {Component, Input, OnInit} from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  constructor(public modalRef: MdbModalRef<LoginModalComponent>) {}

  ngOnInit(): void {
  }

}
