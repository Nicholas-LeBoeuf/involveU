import { Component, OnInit } from '@angular/core';
import {ResponsiveService} from "../../services/responsive.service";

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.scss']
})
export class MoreInfoComponent implements OnInit {

  constructor(public responsiveService: ResponsiveService) { }

  ngOnInit(): void {
  }

}
