import { Component, OnInit } from '@angular/core';
import {ResponsiveService} from "../../services/responsive.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.scss']
})
export class MoreInfoComponent implements OnInit {

  constructor(public responsiveService: ResponsiveService,
              private title: Title) {
    this.title.setTitle("involveU | More Information")
  }

  ngOnInit(): void {
  }

}
