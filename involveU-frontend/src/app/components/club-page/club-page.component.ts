import { Component, OnInit } from '@angular/core';
import { ClubService } from "../../services/club.service";
import { Club } from "../../objects/club";
import { Router } from '@angular/router';

@Component({
  selector: 'app-club-page',
  templateUrl: './club-page.component.html',
  styleUrls: ['./club-page.component.scss']
})
export class ClubPageComponent implements OnInit {

  constructor(private clubService: ClubService,
              private router: Router) { }

  ngOnInit(): void {
    const clubInfo: Club = { ownerID: 1, clubName: 'Environmental Club', clubAffiliation: 'SGA', clubBio: 'Your mom', clubVision: 'Plant Trees', clubLogo: 'Paul LeBlanc EV Car', clubAdvisor: 2}

    this.clubService.insertNewClub(clubInfo).subscribe(success => {
      console.log(success);
    }, error => {
      console.log(error);
    });
  }
  goToSite() {
    this.router.navigateByUrl('/club');
  }
}
