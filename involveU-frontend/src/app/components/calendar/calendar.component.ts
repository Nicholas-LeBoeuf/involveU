import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor() { }

  options = {
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
    events: [
      {  title:  'My Event',
        start:  '2022-11-29T14:30:00',
        end: '2022-11-29T17:30:00',
        allDay: false },
     /* { title: 'event 2', date: '2022-11-30', startStr: '4:00' }*/
    ]
  };

  ngOnInit(): void {
  }

}
