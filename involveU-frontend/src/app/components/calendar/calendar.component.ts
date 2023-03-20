import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Events} from "../../objects/events";
import {CalendarFormat} from "../../objects/calendar-format";
import {EventClickArg} from "@fullcalendar/angular";
import {EventsService} from "../../services/events.service";
import {Title} from "@angular/platform-browser";
import {Club} from "../../objects/club";
import {ClubService} from "../../services/club.service";
import {CookieService} from "ngx-cookie-service";
import {ResponsiveService} from "../../services/responsive.service";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, AfterViewInit {

  constructor(private eventsService: EventsService,
              private toastr: ToastrService,
              public cookie: CookieService,
              public responsiveService: ResponsiveService,
              private clubService: ClubService,
              private title: Title) {
    this.title.setTitle("involveU | Calendar");
  }

  // BOOLEANS
  viewMoreInfoDialog: boolean = false;
  viewFilterDialog: boolean = false;
  disableSpaceDropdown: boolean = true;
  isLoggedIn: boolean = false;

  // NUMBERS
  userID: number;
  locationID: number;
  spaceID: number;

  // STRINGS

  // OBJECTS or ARRAYS
  formattedEvents: CalendarFormat[] = [];
  selectedEvent: Events[] = [];
  eventsToSend: Events[];
  dropdownOptions: Club[] = [];
  locationsList: Events[] = [];
  spacesList: Events[] = [];
  userRSVPdEvents: Events[] = [];

  options = {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    editable: false,
    selectable: true,
    selectMirror: true,
    navLinks: true,
    dayMaxEvents: true,
    contentHeight: '75vh',
    events: this.formattedEvents,
    eventClick: this.showEventInformation.bind(this),
    nowIndicator: true,
    displayEventTime: false
  };


  ngOnInit(): void {
    this.userID = +this.cookie.get('studentID');
    this.getAllClubs();
    this.getLocations();
    this.isUserLoggedIn();
    this.getUserRSVPdEvents();
  }

  ngAfterViewInit() {
    this.activateAllEventsFilter();
  }

  formatAllEvents() {
    this.formattedEvents = []; // Clear previously filtered events

    for (let i = 0; i < this.eventsToSend.length; i++) // Put the events in the proper FullCalendar format
    {
      this.formattedEvents.push({id: this.eventsToDisplay[i].eventID, title: this.eventsToDisplay[i].title, start: this.eventsToDisplay[i].dateTimeFormatted + 'T' + this.eventsToDisplay[i].startDateTime, end: this.eventsToDisplay[i].dateTimeFormatted + 'T' + this.eventsToDisplay[i].endDateTime, allDay: false})
    }

    this.options.events = this.formattedEvents; // Reset the events portion of the options object
  }

  isUserLoggedIn() {
    this.isLoggedIn = this.userID !== 0;
  }


  // GET functions
  getAllClubs() {
    this.clubService.getAllClubs().subscribe(response => {
      this.dropdownOptions = response;
    })
  }

  getLocations() {
    this.eventsService.getLocations().subscribe((response: Events[]) => {
        this.locationsList = response;
      },
      (error) => {
        console.log(error)
      });
  }

  getSpacesByLocation() {
    this.eventsService.getSpaceByLocation(this.locationID).subscribe(response => {
        this.spacesList = response;
      },
      (error) => {
        console.log(error);
      });
  }

  getUserRSVPdEvents() {
    this.eventsService.getUserRSVPdEvents(this.userID).subscribe(response => {
      this.userRSVPdEvents = response;
      console.log(response);
      for(let i = 0; i < this.userRSVPdEvents.length; i++) {
        this.clubService.getClubLogo(this.userRSVPdEvents[i].clubID).subscribe(logo => {
          const reader = new FileReader();
          reader.onload = (e) => this.userRSVPdEvents[i].clubLogo = e.target.result;
          reader.readAsDataURL(new Blob([logo]));
          this.userRSVPdEvents[i].clubLogo = logo;
        })
      }
    })
  }

  // Calendar Activations
  activateAllEventsFilter() {
    this.eventsService.getAllEvents().subscribe(response => {
      this.eventsToSend = [];
      this.eventsToSend = response;
    },
      (error) => {
        console.log(error);
        this.toastr.error('Error Retrieving All Events', undefined, {positionClass: 'toast-top-center', progressBar: true});
      },

      () => {
        this.formatAllEvents();
        this.toastr.show('Currently Displaying All Events', undefined, {positionClass: 'toast-top-center', progressBar: true});
      });

    this.closeViewFilterDialog();
  }

  activateFavoritedClubEventsFilter() {
    this.eventsService.getFavoritedClubsEvents(this.userID).subscribe(response => {
      this.eventsToSend = [];
      this.eventsToSend = response;
    },
      (error) => {
        console.log(error);
        this.toastr.error('Error Retrieving Favorited Club Events', undefined, {positionClass: 'toast-top-center', progressBar: true});
      },

      () => {
        this.formatAllEvents();
        this.toastr.show('Currently Displaying Favorited Club Events', undefined, {positionClass: 'toast-top-center', progressBar: true});
      });

    this.closeViewFilterDialog();
  }

  activateClubFilter(event) {
    this.eventsService.getSpecificClubEvents(event.value.clubID).subscribe(response => {
        this.eventsToSend = [];
        this.eventsToSend = response;
        this.eventsToSend = this.eventsToSend.slice();
      },
      (error) => {
        this.toastr.error('Error Retrieving ' + event.value.clubName + ' Events', undefined, {positionClass: 'toast-top-center', progressBar: true});
        console.log(error);
      },

      () => {
        this.formatAllEvents();
        this.toastr.show('Currently Displaying ' + event.value.clubName + ' Events', undefined, {positionClass: 'toast-top-center', progressBar: true});
      });

    this.closeViewFilterDialog();
  }

  activateSpaceFilter() {
    this.eventsService.getEventsBySpace(this.spaceID).subscribe(response => {
        this.eventsToSend = response;
      },
      (error) => {
        this.toastr.error('Error Retrieving Location Events', undefined, {positionClass: 'toast-top-center', progressBar: true});
        console.log(error);
      },

      () => {
        this.toastr.show('Currently Displaying Events Filtered By Location', undefined, {positionClass: 'toast-top-center', progressBar: true});
        this.formatAllEvents();
      });

    this.closeViewFilterDialog();
  }

  // MISC functions
  checkLocationSelected() {
    this.disableSpaceDropdown = false;
    this.getSpacesByLocation();
  }

  showEventInformation(clickInfo: EventClickArg) {
    this.eventsService.getSpecificEvent(+clickInfo.event.id).subscribe(response => {
      this.selectedEvent.push(response);

      this.clubService.getClubLogo(this.selectedEvent[0].clubID).subscribe(logo => {
        const reader = new FileReader();
        reader.onload = (e) => this.selectedEvent[0].clubLogo = e.target.result;
        reader.readAsDataURL(new Blob([logo]));
        this.selectedEvent[0].clubLogo = logo;
      })

    })
    this.openViewMoreInfoDialog();
  }

  openViewMoreInfoDialog() {
    this.viewMoreInfoDialog = true;
  }

  closeViewMoreInfoDialog() {
    this.selectedEvent = [];
    this.viewMoreInfoDialog = false;
  }

  openViewFilterDialog() {
    this.viewFilterDialog = true;
  }

  closeViewFilterDialog() {
    this.viewFilterDialog = false;
  }

  isUserRSVPd(eventID: number): boolean {
    return this.userRSVPdEvents.some(event => event.eventID === eventID);
  }

  eventRSVP(eventID: number) {
    this.eventsService.rsvpToEvent(eventID, this.userID).subscribe(response => {
      console.log(response);
    },
      error => {
        this.toastr.error('Unsuccessful RSVP Attempt', undefined, {positionClass: 'toast-top-center', progressBar: true});
      },
      () => {
        this.toastr.success('Successfully RSVPd To Event', undefined, {positionClass: 'toast-top-center', progressBar: true});
        location.reload();
      });
  }

  removeEventRSVP(eventID: number) {
    this.eventsService.removeEventRSVP(eventID, this.userID).subscribe(response => {
      console.log(response);
    },
      error => {
        console.log(error);
        this.toastr.error('Unsuccessful Remove RSVP Attempt', undefined, {positionClass: 'toast-top-center', progressBar: true});
      },
      () => {
        this.toastr.success('Successfully Removed RSVP To Event', undefined, {positionClass: 'toast-top-center', progressBar: true});
        location.reload();
      });
  }
}
