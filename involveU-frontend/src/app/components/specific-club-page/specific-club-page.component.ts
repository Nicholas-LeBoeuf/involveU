import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ClubService} from "../../services/club.service";
import {Club} from "../../objects/club";

@Component({
  selector: 'app-specific-club-page',
  templateUrl: './specific-club-page.component.html',
  styleUrls: ['./specific-club-page.component.scss']
})
export class SpecificClubPageComponent implements OnInit {

  constructor(private clubService: ClubService,
              private router: ActivatedRoute) { }

  clubID!: number;
  sub!: any;

  clubInfo!: Club;

  ngOnInit(): void {
    this.sub = this.router.params.subscribe(params => {
      this.clubID = params['id'];
    });

    this.getClubInfo();

  }

  getClubInfo() {
    this.clubService.getSpecificClub(this.clubID).subscribe(response => {
      this.clubInfo = response;
    })
  }

}
