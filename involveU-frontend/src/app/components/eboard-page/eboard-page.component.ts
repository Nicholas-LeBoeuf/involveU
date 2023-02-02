import {Component, OnInit, ViewChild} from '@angular/core';
import {ClubService} from "../../services/club.service";
import {EventsService} from "../../services/events.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Club} from "../../objects/club";
import {Announcement} from "../../objects/announcements";
import { DatePipe } from '@angular/common';
import {AnnouncementsService} from "../../services/announcements.service";
import {Events} from "../../objects/events";
import {Table} from "primeng/table";
import {EboardService} from "../../services/eboard.service";


@Component({
  selector: 'app-eboard-page',
  templateUrl: './eboard-page.component.html',
  styleUrls: ['./eboard-page.component.scss']
})
export class EboardPageComponent implements OnInit {
  announcementForm : FormGroup;
  editAnnouncementForm: FormGroup;
  createEventForm : FormGroup;
  editEventForm : FormGroup
  todaysDate = new Date().toString();
  constructor(private clubService: ClubService,
              private formBuilder: FormBuilder,
              private eventsService: EventsService,
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

    this.editAnnouncementForm = this.formBuilder.group({
      editAnnouncementTitle: ['', Validators.required],
      editContentOfAnnouncement: ['', Validators.required],
      editExpiresOn: ['']
    })

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

    this.todaysDate = this.datePipe.transform(this.todaysDate, 'yyyy-MM-dd');
  }

  //BOOLEANS
  addEventDialog: boolean = false;
  editDialog: boolean = false;
  createAnnouncementDialog: boolean = false;
  editAnnouncementDialog: boolean = false;
  addEventSuccess: boolean = false;
  addEventFailed: boolean = false;
  editEventSuccess: boolean = false;
  editEventFailed: boolean = false;
  disableUserDropdown: boolean = true;
  successMessage: boolean = false;
  failMessage: boolean = false;

  //NUMBERS
  clubID: number;
  userID: number;

  //STRINGS
  message: string;

  //OBJECTS
  clubInfo: Club;
  clubEvents: Events[] = [];
  clubAnnouncements: any = {};
  certainEvent: Events[] = [];
  certainAnnouncement: Announcement[] = [];
  locations: Events[] = [];
  spaces: Events[] = [];
  selectedLocation: any = {};

  @ViewChild('clubEventTable') clubEventTable: Table;
  @ViewChild('clubAnnouncementTable') clubAnnouncementTable: Table;
  locationID: FormControl = new FormControl(null);
  spaceID : FormControl = new FormControl(null);
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
  announcementCols = [
    { field: 'announcementTitle', header: 'Title' },
    { field: 'contentOfAnnouncement', header: 'Announcement Content' },
    { field: 'postedOn', header: 'Date Posted' },
    { field: 'expiresOn', header: 'Date Expired' }
  ]

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.clubID = params['id'];
    });
    this.userID = +this.cookie.get('studentID');
    this.getClubInfo();
    this.getClubEvents();
    this.getSpacesByLocation();
    this.getClubAnnouncements();
    this.getLocations();
  }

  getClubInfo() {
    this.clubService.getSpecificClub(this.clubID).subscribe(response => {
      this.clubInfo = response;
    })
  }

  getClubEvents() {
    this.eventsService.getSpecificClubEvents(this.clubID).subscribe(response => {
      this.clubEvents = response;
    })
  }

  getClubAnnouncements() {
    this.announcementsService.getClubAnnouncements(this.clubID).subscribe(response => {
      this.clubAnnouncements = response;
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

  updateClubAnnouncementSubmit() {
    const updatedAnnouncement: Announcement = {announcementID: this.certainAnnouncement[0].announcementID, clubID: this.clubID, contentOfAnnouncement: this.editAnnouncementForm.value.editContentOfAnnouncement, expiresOn: this.editAnnouncementForm.value.editExpiresOn, announcementTitle: this.editAnnouncementForm.value.editAnnouncementTitle, postedOn: this.todaysDate};
    this.announcementsService.updateAnnouncement(updatedAnnouncement).subscribe(success => {
      console.log(success);
      location.reload();
    },
      (error) => {
      console.log(updatedAnnouncement);
      console.log(error);
    });
  }

  onFilterEventName(event: Event) {
    this.clubEventTable.filterGlobal((event.target as HTMLInputElement).value.toString(), 'contains');
  }

  /*onFilterAnnouncements(announcement: Announcement) {
    this.clubAnnouncementTable.filterGlobal((announcement.target as HTMLInputElement).value.toString(), 'contains');
  }*/

  showAddEventDialog()
  {
    this.addEventDialog = true;
  }
  closeAddEventDialog()
  {
    this.addEventDialog = false;
  }

  showCreateAnnouncementDialog()
  {
    this.createAnnouncementDialog = true;
  }

  closeCreateAnnouncementDialog()
  {
    this.createAnnouncementDialog = false;
  }

  showEditAnnouncementDialog(SpecificAnnouncement: Announcement) {
    this.certainAnnouncement.push(SpecificAnnouncement);
    this.editAnnouncementDialog = true;
  }

  closeEditAnnouncementDialog() {
    this.certainAnnouncement = [];
    this.editAnnouncementDialog = false;
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

  deleteEvent(eventID: number) {
    this.eventsService.deleteEvent(eventID).subscribe(response => {
      console.log(response);
    })
    location.reload();
  }

  deleteAnnouncement(announcementID: number) {
    this.announcementsService.deleteAnnouncement(announcementID).subscribe(response => {
      console.log(response);
    })
    location.reload();
  }

  get getCreateEventsFormInputs()
  {
    return this.createEventForm.controls;
  }

  getLocations() {
    this.eventsService.getLocations().subscribe((response: Events[]) => {
        this.locations = response;
      },
      (error) => {
        console.log(error)
      });
  }

  getSpacesByLocation() {
    this.eventsService.getSpaceByLocation(this.locationID.value).subscribe(response => {
        this.spaces = response;
      },
      (error) => {
        console.log(error)
      });
  }

  checkLocationSelected() {
    if(this.selectedLocation!=='Select Location'){
      this.disableUserDropdown = false;
      this.getSpacesByLocation();
    }
    else {
      this.disableUserDropdown = true;
    }
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

  submitNewEvent()
  {
    const eventInfo : Events = { eventName: this.createEventForm.value.createEventName, eventLocation: this.createEventForm.value.createEventLocation, startTime: this.createEventForm.value.createStartTime, endTime: this.createEventForm.value.createEndTime, eventDate: this.createEventForm.value.createEventDate, eventDesc: this.createEventForm.value.createEventDesc, isTransportation: this.createEventForm.value.createIsTransportation, ticketLink: this.createEventForm.value.createTicketLink, clubName:  this.clubInfo.clubName, clubID: this.clubInfo.clubID };

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
    const eventInfo : Events = {eventID: this.certainEvent[0].eventID, eventName: this.editEventForm.value.editEventName,eventLocation: this.editEventForm.value.editEventLocation, startTime: this.editEventForm.value.editStartTime, endTime: this.editEventForm.value.editEndTime, eventDate: this.editEventForm.value.editEventDate, eventDesc: this.editEventForm.value.editEventDesc, isTransportation: this.editEventForm.value.editIsTransportation, ticketLink: this.editEventForm.value.editTicketLink,clubName:  this.clubInfo.clubName, clubID: this.clubInfo.clubID };

    this.eventsService.updateEvent(eventInfo).subscribe(success =>{
      console.log(success);
      this.editEventSuccess = true;
    },(error) =>{

      this.getClubEvents();
      console.log(error.text);
      this.editEventFailed = true;
    })
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
}
