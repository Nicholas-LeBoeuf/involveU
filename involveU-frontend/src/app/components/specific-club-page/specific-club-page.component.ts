import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ClubService} from "../../services/club.service";
import {Club} from "../../objects/club";
import {CookieService} from "ngx-cookie-service";
import {Events} from "../../objects/events";
import {User} from "../../objects/user";
import {EventsService} from "../../services/events.service";
import {Eboard} from "../../objects/Eboard";

@Component({
  selector: 'app-specific-club-page',
  templateUrl: './specific-club-page.component.html',
  styleUrls: ['./specific-club-page.component.scss']
})
export class SpecificClubPageComponent implements OnInit {

  constructor(private clubService: ClubService,
              private eventsService: EventsService,
              private route: ActivatedRoute,
              private router: Router,
              public cookie: CookieService) { }

  clubID!: number;
  userID!: number;

  clubIsFav: boolean = false;
  clubInfo!: Club;
  favoritedClubs: Club[] = [];
  clubEboard: User[] = [];

  successMessage: boolean = false;
  failMessage: boolean = false;
  message!: string;

  clubEvents: Events[] = [];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.clubID = params['id'];
    });

    this.userID = +this.cookie.get('studentID');

    this.getClubInfo();
    this.getUsersFavoritedClubs();
    this.getClubEvents();
    this.getEboard();
  }

  getClubInfo() {
    this.clubService.getSpecificClub(this.clubID).subscribe(response => {
      this.clubInfo = response;
    })
  }

  removeFromFavorites(userID: number, clubID: number) {
    this.clubService.unfavoriteClub(clubID, userID).subscribe()
    this.message = 'Club successfully unfavorited!';
    this.successMessage = true;
    location.reload();
  }

  favoriteClub(userID: number, clubID: number) {
    this.clubService.favoriteClub(userID, clubID).subscribe()
    this.message = 'Club successfully favorited!';
    this.successMessage = true;
    location.reload();
  }

  getUsersFavoritedClubs() {
    this.clubService.getUsersFavoritedClubs(+this.cookie.get('studentID')).subscribe(response => {
        this.favoritedClubs = response;
        this.isClubFavorited();
      },
      (error) => {
        console.log(error);
      })
  }

  isClubFavorited() {
    for (let i = 0; i < this.favoritedClubs.length; i++ ) {
      if (this.favoritedClubs[i].clubID === +this.clubID)
      {
        this.clubIsFav = true;
      }
    }
  }

  getClubEvents() {
    this.eventsService.getSpecificClubEvents(this.clubID).subscribe(response => {
      this.clubEvents = response;
    })
  }

  eventRSVP(eventID: number) {
    this.eventsService.rsvpToEvent(eventID, this.userID).subscribe(response => {
      console.log(response);
    })
  }
  getEboard()
  {
    this.clubService.getClubEboard(this.clubID).subscribe(response => {
      this.clubEboard = response;
      console.log(this.clubEboard);
    })
  }
}
