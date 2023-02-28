import {Component, OnInit} from '@angular/core';
import {Events} from "../../objects/events";
import {CalendarFormat} from "../../objects/calendar-format";
import {EventClickArg} from "@fullcalendar/angular";
import {EventsService} from "../../services/events.service";
import {Title} from "@angular/platform-browser";
import {Club} from "../../objects/club";
import {ClubService} from "../../services/club.service";
import {CookieService} from "ngx-cookie-service";


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor(private eventsService: EventsService,
              public cookie: CookieService,
              private clubService: ClubService,
              private title: Title) {
    this.title.setTitle("involveU | Calendar");
  }

  // BOOLEANS
  viewMoreInfoDialog: boolean = false;
  disableSpaceDropdown: boolean = false;

  // NUMBERS
  userID: number;
  locationID: number;
  spaceID: number;

  // STRINGS


  // OBJECTS or ARRAYS
  formattedEvents: CalendarFormat[] = [];
  selectedEvent: Events;
  eventsToSend: Events[];
  dropdownOptions: Club[] = [];
  locationsList: Events[] = [];
  spacesList: Events[] = [];

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
  }

  formatAllEvents() {
    this.formattedEvents = []; // Clear previously filtered events

    for (let i = 0; i < this.eventsToSend.length; i++) // Put the events in the proper FullCalendar format
    {
      this.formattedEvents.push({id: this.eventsToSend[i].eventID, title: this.eventsToSend[i].eventName, start: this.eventsToSend[i].eventDate + 'T' + this.eventsToSend[i].startTime, end: this.eventsToSend[i].eventDate + 'T' + this.eventsToSend[i].endTime, allDay: false})
    }

    this.options.events = this.formattedEvents; // Reset the events portion of the options object
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

  // Calendar Activations
  activateAllEventsFilter() {
    this.eventsService.getAllEvents().subscribe(response => {
      this.eventsToSend = [];
      this.eventsToSend = response;
    },
      (error) => {
        console.log(error);
      },

      () => {
        this.formatAllEvents();
      });
  }

  activateFavoritedClubEventsFilter() {
    this.eventsService.getFavoritedClubsEvents(this.userID).subscribe(response => {
      this.eventsToSend = [];
      this.eventsToSend = response;
    },
      (error) => {
      console.log(error);
      },

      () => {
        this.formatAllEvents();
      });
  }

  activateSpaceFilter() {
    this.eventsService.getEventsBySpace(this.spaceID).subscribe(response => {
        this.eventsToSend = response;
      },
      (error) => {
        console.log(error);
      },

      () => {
        this.formatAllEvents();
      });
  }

  // MISC functions
  onClubSelected(event) {
    this.eventsService.getSpecificClubEvents(event.value.clubID).subscribe(response => {
      this.eventsToSend = [];
      this.eventsToSend = response;
      this.eventsToSend = this.eventsToSend.slice();
    },
      (error) => {
        console.log(error);
      },

      () => {
        this.formatAllEvents();
      });
  }

  checkLocationSelected() {
    this.disableSpaceDropdown = false;
    this.getSpacesByLocation();
  }

  showEventInformation(clickInfo: EventClickArg) {
    this.eventsService.getSpecificEvent(+clickInfo.event.id).subscribe(response => {
      this.selectedEvent = response;
    })
    this.openViewMoreInfoDialog();
  }

  openViewMoreInfoDialog() {
    this.viewMoreInfoDialog = true;
  }

  closeViewMoreInfoDialog() {
    this.viewMoreInfoDialog = false;
  }
}
