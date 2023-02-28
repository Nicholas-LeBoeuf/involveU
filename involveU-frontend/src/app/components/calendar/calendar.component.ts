import {AfterViewInit, Component, EventEmitter, Input, IterableDiffers, OnInit, Output} from '@angular/core';
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

  private differ: IterableDiffers;

  constructor(private eventsService: EventsService,
              public cookie: CookieService,
              private clubService: ClubService,
              private title: Title,
              private differs: IterableDiffers) {
    this.title.setTitle("involveU | Calendar");
    this.differ = differs
  }

  viewMoreInfoDialog: boolean = false;

  @Input() eventsToDisplay: Events[];
  formattedEvents: CalendarFormat[] = [];
  selectedEvent: Events;

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





  userID: number;
  eventsToSend: Events[];
  dropdownOptions: Club[] = [];

  optionSelected: boolean = false;

  locationID: number;
  spaceID: number;
  disableSpaceDropdown: boolean = false;
  locationsList: Events[] = [];
  spacesList: Events[] = [];

  @Output() sendEvents = new EventEmitter<Events[]>();





  ngOnInit(): void {
    this.userID = +this.cookie.get('studentID');
    this.getAllClubs();
    this.getLocations();


  }


  getAllClubs() {
    this.clubService.getAllClubs().subscribe(response => {
      this.dropdownOptions = response;
    })
  }
  activateAllEvents() {
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
    this.optionSelected = true;

  }

  activateFavoritedClubEvents() {
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
    this.optionSelected = true;


  }

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
    this.optionSelected = true;

  }

  returnToFilter() {
    location.reload();
  }

  checkLocationSelected() {
    this.disableSpaceDropdown = false;
    this.getSpacesByLocation();
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

  onSpaceSelected() {
    this.eventsService.getEventsBySpace(this.spaceID).subscribe(response => {
      this.eventsToSend = response;
    },
      (error) => {
        console.log(error);
      },

      () => {
        this.formatAllEvents();
      });
    this.optionSelected = true;
  }








  formatAllEvents() {
   /* if(this.formattedEvents.length !== 0)
    {
      console.log("emptying");

    }*/

    this.formattedEvents = [];
    for (let i = 0; i < this.eventsToSend.length; i++)
    {
      this.formattedEvents.push({id: this.eventsToSend[i].eventID, title: this.eventsToSend[i].eventName, start: this.eventsToSend[i].eventDate + 'T' + this.eventsToSend[i].startTime, end: this.eventsToSend[i].eventDate + 'T' + this.eventsToSend[i].endTime, allDay: false})
    }


    this.options.events = this.formattedEvents;
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
