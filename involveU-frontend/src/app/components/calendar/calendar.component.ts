import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Events} from "../../objects/events";
import {CalendarFormat} from "../../objects/calendar-format";
import {EventClickArg} from "@fullcalendar/angular";
import {EventsService} from "../../services/events.service";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor(private eventsService: EventsService,
              private cd: ChangeDetectorRef) {}

/*  options: any;*/

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
    dayMaxEvents: true,
    contentHeight: '75vh',
    events: this.formattedEvents,
    eventClick: this.showEventInformation.bind(this),
    nowIndicator: true,

  };

  ngOnInit(): void {
    this.formatAllEvents();
  }

  formatAllEvents() {
    for (let i = 0; i < this.eventsToDisplay.length; i++)
    {
      this.formattedEvents.push({id: this.eventsToDisplay[i].eventID, title: this.eventsToDisplay[i].eventName, start: this.eventsToDisplay[i].eventDate + 'T' + this.eventsToDisplay[i].startTime, end: this.eventsToDisplay[i].eventDate + 'T' + this.eventsToDisplay[i].endTime, allDay: false})
    }
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
