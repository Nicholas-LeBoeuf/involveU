import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ClubService} from "../../services/club.service";
import {Club} from "../../objects/club";
import {CookieService} from "ngx-cookie-service";
import {Events} from "../../objects/events";
import {User} from "../../objects/user";
import {EventsService} from "../../services/events.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Eboard} from "../../objects/Eboard";

@Component({
  selector: 'app-specific-club-page',
  templateUrl: './specific-club-page.component.html',
  styleUrls: ['./specific-club-page.component.scss']
})
export class SpecificClubPageComponent implements OnInit {

  createEventForm : FormGroup;

  createNewEventForm: FormControl = new FormControl(null);
  constructor(private clubService: ClubService,
              private formBuilder: FormBuilder,
              private eventsService: EventsService,
              private route: ActivatedRoute,
              private router: Router,
              public cookie: CookieService) {
    this.createEventForm = this.formBuilder.group({
      eventName: ['', Validators.required],
      eventLocation: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      eventDate: ['', Validators.required],
      eventDesc: ['', Validators.required],
      isTransportation: ['', Validators.required],
      ticketLink: ['', Validators.required],

    })
  }


  clubID!: number;
  userID!: number;

  clubIsFav: boolean = false;
  clubInfo!: Club;
  favoritedClubs: Club[] = [];
  clubEboard: User[] = [];
  isEboard: boolean = false;
  successMessage: boolean = false;
  failMessage: boolean = false;
  message!: string;
  eventDialog: boolean = false;
  editDialog: boolean = false;
  addEventDialog: boolean = false;
  clubEvents: Events[] = [];
  certainEvent: Events[] = [];

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
  isInEboard()
  {
    //console.log(arr.find(e => e.foo === 'bar'))
    let studentID : number = +this.cookie.get('userID');
    console.log(this.cookie.get('studentFName'));
    console.log(this.clubEboard.some(e => e.studentID === this.userID));
    //console.log("Boolean value:", array1.includes(44));
    if(this.clubEboard.some(e => e.studentID === this.userID)=== false)
    {
      return false;
    }
    else
    {
     return true;
    }
  }
  showEventsDialog()
  {
    this.eventDialog = true;
  }

  closeEventsDialog()
  {
    this.eventDialog = false;
  }
  showAddEventDialog()
  {
    this.addEventDialog = true;
  }
  closeAddEventDialog()
  {
    this.addEventDialog = false;
  }
  showEditDialog(SpecficEvent: Events)
  {

    console.log(SpecficEvent);
    this.certainEvent.push(SpecficEvent);
    this.editDialog = true;
    console.log(this.certainEvent);
  }
  closeEditDialog() {
    this.certainEvent = [];
    this.editDialog = false;
    this.createEventForm.reset();
   }

  submitNewEvent()
  {
    const eventInfo : Events = { eventName: this.createEventForm.value.eventName,eventLocation: this.createEventForm.value.eventLocation, startTime: this.createEventForm.value.startTime, endTime: this.createEventForm.value.endTime, eventDate: this.createEventForm.value.eventDate, eventDesc: this.createEventForm.value.eventDesc, isTransportation: this.createEventForm.value.isTransportation, ticketLink: this.createEventForm.value.ticketLink,clubName:  this.clubInfo.clubName, clubID: this.clubInfo.clubID };

    this.eventsService.submitNewEvent(eventInfo).subscribe(success =>{
      console.log(success);

    },(error) =>{
      location.reload();
      console.log(error.text);
      })
  }

  updateEvent()
  {
    const eventInfo : Events = {eventID: this.certainEvent[0].eventID, eventName: this.createEventForm.value.eventName,eventLocation: this.createEventForm.value.eventLocation, startTime: this.createEventForm.value.startTime, endTime: this.createEventForm.value.endTime, eventDate: this.createEventForm.value.eventDate, eventDesc: this.createEventForm.value.eventDesc, isTransportation: this.createEventForm.value.isTransportation, ticketLink: this.createEventForm.value.ticketLink,clubName:  this.clubInfo.clubName, clubID: this.clubInfo.clubID };

    this.eventsService.updateEvent(eventInfo).subscribe(success =>{
        console.log(success);

      },(error) =>{
      location.reload();
        this.getClubEvents();
        console.log(error.text);
      })
  }
  get getEventsFormInputs()
  {
    return this.createEventForm.controls;
  }
  areFormInputsValid()
  {
    if(this.createEventForm.value.eventName == '' || this.createEventForm.value.eventLocation == '' ||this.createEventForm.value.startTime == '' || this.createEventForm.value.endTime == '' || this.createEventForm.value.eventDate == '' || this.createEventForm.value.eventDesc == '') {
      return true;
    }
    else{
        return false;
      }

  }
}
