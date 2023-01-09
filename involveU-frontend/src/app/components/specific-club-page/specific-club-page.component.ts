import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ClubService} from "../../services/club.service";
import {Club} from "../../objects/club";
import {CookieService} from "ngx-cookie-service";
import {Events} from "../../objects/events";
import {User} from "../../objects/user";
import {EventsService} from "../../services/events.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Eboard} from "../../objects/Eboard";
import {Table} from "primeng/table";

@Component({
  selector: 'app-specific-club-page',
  templateUrl: './specific-club-page.component.html',
  styleUrls: ['./specific-club-page.component.scss']
})
export class SpecificClubPageComponent implements OnInit {

  createEventForm : FormGroup;
  editEventForm : FormGroup

  createNewEventForm: FormControl = new FormControl(null);
  constructor(private clubService: ClubService,
              private formBuilder: FormBuilder,
              private eventsService: EventsService,
              private route: ActivatedRoute,
              private router: Router,
              public cookie: CookieService) {
    this.createEventForm = this.formBuilder.group({
      createEventName: ['', Validators.required],
      createEventLocation: ['', Validators.required],
      createStartTime: ['', Validators.required],
      createEndTime: ['', Validators.required],
      createEventDate: ['', Validators.required],
      createEventDesc: ['', Validators.required],
      createIsTransportation: ['', Validators.required],
      createTicketLink: ['', Validators.required],

    })
    this.editEventForm = this.formBuilder.group({
      editEventName: ['', Validators.required],
      editEventLocation: ['', Validators.required],
      editStartTime: ['', Validators.required],
      editEndTime: ['', Validators.required],
      editEventDate: ['', Validators.required],
      editEventDesc: ['', Validators.required],
      editIsTransportation: ['', Validators.required],
      editTicketLink: ['', Validators.required],

    })
  }

  isLoggedIn: boolean = false;
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
  viewMoreInfoDialog: boolean = false;
  clubEvents: Events[] = [];
  certainEvent: Events[] = [];
  userRSVPdEvents: Events[] = [];
  editEventSuccess: boolean = false;
  editEventFailed: boolean = false;
  addEventSuccess: boolean = false;
  addEventFailed: boolean = false;

  @ViewChild('clubEventTable') clubEventTable: Table;

  cols = [
    { field: 'eventName', header: 'Name' },
    { field: 'eventDate', header: 'Date' },
    { field: 'startTime', header: 'Start Time' },
    { field: 'endTime', header: 'End Time' },
    { field: 'eventLocation', header: 'Location' },
    { field: 'eventDesc', header: 'Description' },
    { field: 'ticketLink', header: 'Ticket Link' },
    { field: 'isTransportation', header: 'Transportation' }
  ];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.clubID = params['id'];
    });

    this.userID = +this.cookie.get('studentID');
    this.isUserLoggedIn();
    this.getClubInfo();
    this.getUsersFavoritedClubs();
    this.getClubEvents();
    this.getEboard();
    this.getUserRSVPdEvents();


    console.log(this.isLoggedIn);
    console.log(this.clubIsFav);
  }

  isUserLoggedIn() {
    this.isLoggedIn = this.userID !== 0;
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

    this.message = "Event Successfully RSVPd!";
    this.successMessage = true;
    location.reload();
  }
  getEboard()
  {
    this.clubService.getClubEboard(this.clubID).subscribe(response => {
      this.clubEboard = response;
    })
  }
  isInEboard()
  {
    //console.log(arr.find(e => e.foo === 'bar'))
    let studentID : number = +this.cookie.get('userID');
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
    this.certainEvent.push(SpecficEvent);
    this.editDialog = true;
  }
  closeEditDialog() {
    this.certainEvent = [];
    this.editDialog = false;
   }

  showViewMoreInfoDialog(SpecificEvent: Events){
    this.certainEvent.push(SpecificEvent);
    this.viewMoreInfoDialog = true;
  }
  closeViewMoreInfoDialog(){
    this.certainEvent = [];
    this.viewMoreInfoDialog = false;
  }

  submitNewEvent()
  {
    const eventInfo : Events = { eventName: this.createEventForm.value.createEventName, eventLocation: this.createEventForm.value.createEventLocation, startTime: this.createEventForm.value.createStartTime, endTime: this.createEventForm.value.createEndTime, eventDate: this.createEventForm.value.createEventDate, eventDesc: this.createEventForm.value.createEventDesc, isTransportation: +this.createEventForm.value.createIsTransportation, ticketLink: this.createEventForm.value.createTicketLink, clubName:  this.clubInfo.clubName, clubID: this.clubInfo.clubID };

    this.eventsService.submitNewEvent(eventInfo).subscribe(success =>{
      console.log(success);
      this.addEventSuccess = true;
      location.reload();
    },(error) =>{
      location.reload();
      console.log(error.text);
      this.addEventFailed = true;
      })
  }

  updateEvent()
  {
    const eventInfo : Events = {eventID: this.certainEvent[0].eventID, eventName: this.editEventForm.value.editEventName,eventLocation: this.editEventForm.value.editEventLocation, startTime: this.editEventForm.value.editStartTime, endTime: this.editEventForm.value.editEndTime, eventDate: this.editEventForm.value.editEventDate, eventDesc: this.editEventForm.value.editEventDesc, isTransportation: +this.editEventForm.value.editIsTransportation, ticketLink: this.editEventForm.value.editTicketLink,clubName:  this.clubInfo.clubName, clubID: this.clubInfo.clubID };

    console.log(eventInfo);

    this.eventsService.updateEvent(eventInfo).subscribe(success =>{
        console.log(success);
        this.editEventSuccess = true;
      },(error) =>{

        this.getClubEvents();
        console.log(error.text);
        this.editEventFailed = true;
      })
  }
  get getCreateEventsFormInputs()
  {
    return this.createEventForm.controls;
  }
  areCreateFormInputsValid()
  {
    if(this.createEventForm.value.createEventName == '' || this.createEventForm.value.createEventLocation == '' ||this.createEventForm.value.createStartTime == '' || this.createEventForm.value.createEndTime == '' || this.createEventForm.value.createEventDate == '' || this.createEventForm.value.createEventDesc == '') {
      return true;
    }
    else{
        return false;
      }

  }

  get getEditEventsFormInputs()
  {
    return this.editEventForm.controls;
  }
  areEditFormInputsValid()
  {
    if(this.editEventForm.value.editEventName == '' || this.editEventForm.value.editEventLocation == '' ||this.editEventForm.value.editStartTime == '' || this.editEventForm.value.editEndTime == '' || this.editEventForm.value.editEventDate == '' || this.editEventForm.value.editEventDesc == '') {
      return true;
    }
    else{
      return false;
    }

  }

  deleteEvent(eventID: number) {
    this.eventsService.deleteEvent(eventID).subscribe(response => {
      console.log(response);
    })
    location.reload();
  }

  getUserRSVPdEvents() {
    this.eventsService.getUserRSVPdEvents(this.userID).subscribe(response => {
      this.userRSVPdEvents = response;
    })
  }

  isUserRSVPd(eventID: number): boolean {
    return this.userRSVPdEvents.some(event => event.eventID === eventID);
  }

  removeEventRSVP(eventID: number) {
    this.eventsService.removeEventRSVP(eventID, this.userID).subscribe(response => {
      console.log(response);

    })

    this.message = "Successfully Removed RSVP!";
    this.successMessage = true;
    location.reload();
  }

  onFilterEventName(event: Event) {
    this.clubEventTable.filterGlobal((event.target as HTMLInputElement).value.toString(), 'contains');
  }
}


