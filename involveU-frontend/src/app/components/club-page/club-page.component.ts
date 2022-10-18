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

  displayClubSearchModal: boolean = false;

  searchText = '';
  characters = [
    'Ant-Man',
    'Aquaman',
    'Asterix',
    'The Atom',
    'The Avengers',
    'Batgirl',
    'Batman',
    'Batwoman'
  ]

  allClubs: Club[] = [];

  ngOnInit(): void {
    this.fillClubList();
  }

  showClubSearchDialog() {
    this.displayClubSearchModal = true;
  }

  closeClubSearchDialog() {
    this.displayClubSearchModal = false;
  }

  fillClubList() {
    this.clubService.getAllClubs().subscribe((response: Club[]) => {
      this.allClubs = response;
      console.log(response);
      console.log(this.allClubs);
    });
  }

}
