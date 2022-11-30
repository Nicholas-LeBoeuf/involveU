import { Component, OnInit } from '@angular/core';
import {ClubService} from "../../services/club.service";
import {EventsService} from "../../services/events.service";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {Events} from "../../objects/events";
import {CalendarFormat} from "../../objects/calendar-format";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  constructor(private clubService: ClubService,
              private eventsService: EventsService,
              private router: Router,
              public cookie: CookieService) {
  }


  allEvents: Events[];
  formattedEvents: CalendarFormat[];


  ngOnInit() {
    this.getAllEvents();
  }

  getAllEvents() {
    this.eventsService.getAllEvents().subscribe(response => {
      this.allEvents = response;
    });
  }


}
