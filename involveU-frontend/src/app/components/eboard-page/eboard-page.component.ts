import { Component, OnInit } from '@angular/core';
import {ClubService} from "../../services/club.service";
import {EventsService} from "../../services/events.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Club} from "../../objects/club";
import {Announcement} from "../../objects/announcements";
import { DatePipe } from '@angular/common';
import {AnnouncementsService} from "../../services/announcements.service";

@Component({
  selector: 'app-eboard-page',
  templateUrl: './eboard-page.component.html',
  styleUrls: ['./eboard-page.component.scss']
})
export class EboardPageComponent implements OnInit {
  announcementForm : FormGroup;
  todaysDate = new Date().toString();
  constructor(private clubService: ClubService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private announcementsService: AnnouncementsService,
              public cookie: CookieService,
              private datePipe: DatePipe) {
    this.announcementForm = this.formBuilder.group({
      clubID: [''],
      contentOfAnnouncement: ['', Validators.required],
      expiresOn: [''],
      announcementTitle: ['', Validators.required],
      postedOn: ['']
    })
    this.todaysDate = this.datePipe.transform(this.todaysDate, 'yyyy-MM-dd');
  }
  clubID!: number;
  userID!: number;
  clubInfo!: Club;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.clubID = params['id'];
    });
    this.userID = +this.cookie.get('studentID');
    this.getClubInfo();
  }

  getClubInfo() {
    this.clubService.getSpecificClub(this.clubID).subscribe(response => {
      this.clubInfo = response;
    })
  }

  get announcementFormInputs()
  {
    return this.announcementForm.controls;
  }

  createAnnouncementSubmit() {
    const newAnnouncement: Announcement = {clubID: this.clubID, contentOfAnnouncement: this.announcementForm.value.contentOfAnnouncement, expiresOn: this.announcementForm.value.expiresOn, announcementTitle: this.announcementForm.value.announcementTitle, postedOn: this.todaysDate};
    console.log(newAnnouncement);
    this.announcementsService.createAnnouncement(newAnnouncement).subscribe(success =>{
        console.log(success);
        location.reload();
      },
      (error) => {
        console.log(error);
      });
  }
}
