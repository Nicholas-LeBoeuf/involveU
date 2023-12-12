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
import {Router} from "@angular/router";


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
              private title: Title,
              private router: Router) {

    this.title.setTitle("involveU | Calendar");
  }

  // BOOLEANS
  viewMoreInfoDialog: boolean = false;
  viewFilterDialog: boolean = false;
  disableSpaceDropdown: boolean = true;
  isLoggedIn: boolean = false;

  // NUMBERS
  eventID: number;
  userID: number;
  RSVPEventCount: number;
  // STRINGS
  currentFilter: string;

  // OBJECTS or ARRAYS
  formattedEvents: CalendarFormat[] = [];
  selectedEvent: Events[] = [];
  eventsToSend: Events[];
  dropdownOptions: Club[] = [];
  locationsList: Events[] = [];
  spacesList: Events[] = [];
  userRSVPdEvents: Events[] = [];

  // There are the options for the FullCalendar that is sent to the FullCalendar component.
  // Here is the documentation for FullCalendar https://fullcalendar.io/docs
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
    eventBackgroundColor: 'blue',
    eventTextColor: 'white',
    nowIndicator: true,
    displayEventTime: false


  };




  ngOnInit(): void {
    this.userID = +this.cookie.get('studentID');
    this.eventID = +this.cookie.get('eventID');
    this.getAllClubs();
    this.isUserLoggedIn();
    this.getUserRSVPdEvents();
    this.getRSVPEventCount();
  }

  ngAfterViewInit() {
    if (this.isLoggedIn === true) {
      this.activateAllEventsFilter();
    }
  }

  formatAllEvents() {
    this.formattedEvents = []; // Clear previously filtered events

    // What this is doing is checking each title string in the array and replacing encoded HTML symbols with the correct symbol to display on the calendar
    for(let j = 0; j < this.eventsToSend.length; j++)
    {
      this.eventsToSend[j].title = this.eventsToSend[j].title.replace(/&#39;/g,"\'");
      this.eventsToSend[j].title = this.eventsToSend[j].title.replace(/&quot;/g, "\"");
      this.eventsToSend[j].title = this.eventsToSend[j].title.replace(/&lt;/g, "<");
      this.eventsToSend[j].title = this.eventsToSend[j].title.replace(/&gt;/g, ">");
      this.eventsToSend[j].title = this.eventsToSend[j].title.replace(/&amp;/g, "&");
    }

    //Formatting the events into the correct format for the calendar library
    for (let i = 0; i < this.eventsToSend.length; i++) // Put the events in the proper FullCalendar format
    {
      this.formattedEvents.push({id: this.eventsToSend[i].eventID, title: this.eventsToSend[i].title, start: this.eventsToSend[i].dateTimeFormatted + 'T' + this.eventsToSend[i].startDateTime, end: this.eventsToSend[i].dateTimeFormatted + 'T' + this.eventsToSend[i].endDateTime, allDay: false})
    }

    //Sets the events in the options object. Options object is sent to the calendar component
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


  getUserRSVPdEvents() {
    this.eventsService.getUserRSVPdEvents(this.userID).subscribe(response => {
      this.userRSVPdEvents = response;
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
        this.currentFilter = 'allEventsFilter';

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
        this.currentFilter = 'favoritedClubEventsFilter';
      });

    this.closeViewFilterDialog();
  }

  activateClubFilter(event) {
    this.eventsService.getSpecificClubEvents(event.value.clubID).subscribe(response => {
        this.eventsToSend = [];
        this.eventsToSend = response;
        console.log(response);
        this.eventsToSend = this.eventsToSend.slice();
      },
      (error) => {
        this.toastr.error('Error Retrieving ' + event.value.clubName + ' Events', undefined, {positionClass: 'toast-top-center', progressBar: true});
        console.log(error);
      },

      () => {
        this.formatAllEvents();
        this.toastr.show('Currently Displaying ' + event.value.clubName + ' Events', undefined, {positionClass: 'toast-top-center', progressBar: true});
        this.currentFilter = 'clubEventsFilter';
      });

    this.closeViewFilterDialog();
  }

  activateRSVPFilter() {
    this.eventsToSend = [];
    this.eventsToSend = this.userRSVPdEvents;
    this.eventsToSend = this.eventsToSend.slice();
    this.formatAllEvents();
    this.toastr.show('Currently Displaying ' + 'RSVP\'d Events' + ' Events', undefined, {positionClass: 'toast-top-center', progressBar: true});
    this.currentFilter = 'RSVPEventsFilter';
  }

  // MISC functions
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

  closeViewFilterDialog() {
    this.viewFilterDialog = false;
  }

  isUserRSVPd(eventID: number): boolean {
    return this.userRSVPdEvents.some(event => event.eventID === eventID);
  }

  eventRSVP(eventID: number,clubID: number) {
    this.eventsService.rsvpToEvent(eventID, this.userID,clubID).subscribe(response => {
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

  goToClubPage(clubID: number) {
    this.router.navigate(['/clubs/' + clubID]).then();
  }

  getRSVPEventCount() {
    this.eventsService.getCountOfRSVP(+this.eventID).subscribe(response => {
      this.RSVPEventCount = response;
      console.log('RSVP count:', this.RSVPEventCount);
    });
  }

  protected readonly ResponsiveService = ResponsiveService;
}
