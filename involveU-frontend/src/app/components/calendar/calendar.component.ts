import {Component, Input, OnInit} from '@angular/core';
import {Events} from "../../objects/events";
import {CalendarFormat} from "../../objects/calendar-format";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor() { }

  options: any;


  @Input() eventsToDisplay: Events[];
  formattedEvents: CalendarFormat[] = [];

  ngOnInit(): void {
    this.formatAllEvents();
  }


  formatAllEvents() {
    for (let i = 0; i < this.eventsToDisplay.length; i++)
    {
      this.formattedEvents.push({title: this.eventsToDisplay[i].eventName, start: this.eventsToDisplay[i].eventDate + 'T' + this.eventsToDisplay[i].startTime, end: this.eventsToDisplay[i].eventDate + 'T' + this.eventsToDisplay[i].endTime, allDay: false})
    }

    this.setOptions();
  }
  
  setOptions() {
    this.options = {
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      editable: true,
      selectable:true,
      selectMirror: true,
      dayMaxEvents: true,
      contentHeight: '80vh',
      events: this.formattedEvents/*[
      {  title:  'My Event this tnjs askjdn'+ '\r\n' + 'Test',
        start:  '2022-11-29T14:30:00',
        end: '2022-11-29T17:30:00',
        allDay: false,},
     /!* { title: 'event 2', date: '2022-11-30', startStr: '4:00' }*!/
    ]*/
    };
  }
}
