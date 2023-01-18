import { Component, OnInit } from '@angular/core';
import {ClubService} from "../../services/club.service";
import {EventsService} from "../../services/events.service";
import {EboardService} from "../../services/eboard.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-eboard-page',
  templateUrl: './eboard-page.component.html',
  styleUrls: ['./eboard-page.component.scss']
})
export class EboardPageComponent implements OnInit {
  announcementForm : FormGroup;
  constructor(private clubService: ClubService,
              private formBuilder: FormBuilder,
              private eboardService: EboardService,
              private route: ActivatedRoute,
              private router: Router,
              public cookie: CookieService) {
    this.announcementForm = this.formBuilder.group({
      clubID: [''],
      contentOfAnnouncement: ['', Validators.required],
      expiresOn: [''],
      announcementTitle: ['', Validators.required]
    })
  }
  clubID!: number;

  ngOnInit(): void {
  }

  get announcementFormInputs()
  {
    return this.announcementForm.controls;
  }

  /*createAnnouncementSubmit() {
    const newAnnouncement: Announcement = {clubID: this.clubID, contentOfAnnouncement: this.announcementForm.value.contentOfAnnouncement, expiresOn: this.announcementForm.value.expiresOn, announcementTitle: this.announcementForm.value.announcementTitle};
    console.log(newAnnouncement);
    this.eboardService.createAnnouncement(newAnnouncement).subscribe(success =>{
        console.log(success);
        location.reload();
      },
      (error) => {
        console.log(error);
      });
  }*/
}
