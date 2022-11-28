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
      right: 'dayGridMonth, dayGridWeek, dayGridDay'
    },
    editable: true,
    selectable:true,
    selectMirror: true,
    dayMaxEvents: true,
    contentHeight: '85.7vh'
  };

  ngOnInit(): void {
  }

}
