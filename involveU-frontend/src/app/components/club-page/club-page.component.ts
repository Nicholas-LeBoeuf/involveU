import {Component, OnInit, ViewChild} from '@angular/core';
import { ClubService } from "../../services/club.service";
import { Club } from "../../objects/club";
import { Router } from '@angular/router';
import {CookieService} from "ngx-cookie-service";
import {ButtonModule} from "primeng/button";
import {LazyLoadEvent} from "primeng/api";
import {Table} from "primeng/table";

@Component({
  selector: 'app-club-page',
  templateUrl: './club-page.component.html',
  styleUrls: ['./club-page.component.scss']
})
export class ClubPageComponent implements OnInit {

  constructor(private clubService: ClubService,
              private router: Router,
              public cookie: CookieService) { }

  displayClubSearchModal: boolean = false;
  displayClubSearchLoggedInModal: boolean = false;
  isLoggedIn: boolean = false;

  timeout: boolean = false;
  userID: number = -1;

  loading: boolean = true;

  successMessage: boolean = false;
  failMessage: boolean = false;
  message!: string;

  imagesForClubSearch: any = ['cape.png', 'cssa.png', 'penmenPress.png', 'radioSNHU.png', 'snhuLogoStock.png'];
  allClubs: Club[] = [];
  compareAllClubs: Club[] = [];
  topClubs: Club[] = [];
  favoritedClubs: Club[] = [];
  notFavoritedClubs: Club[] = [];

  @ViewChild('ClubTable') clubTable: Table;
  @ViewChild('ClubTable2') clubTable2: Table;

  ngOnInit(): void {
    this.userID = +this.cookie.get('studentID')
    this.fillClubList();
    this.getTopClubs();
    this.getUsersFavoritedClubs();
    this.loading = false;

    if (!localStorage.getItem('isReloaded')) {
      localStorage.setItem('isReloaded', 'no reload')
      location.reload()
    }
    else {
      localStorage.removeItem('isReloaded')
    }
  }

  checkLogin() {
    if (this.userID !== 0) {
      this.isLoggedIn = true;
      this.getClubsThatArentFavorited();
    }
    else {
      this.showClubSearchDialog();
    }
    console.log(this.userID);
    console.log(this.isLoggedIn);
  }

  showClubSearchDialog() {
    this.displayClubSearchModal = true;
  }

  closeClubSearchDialog() {
    this.displayClubSearchModal = false;
  }

  showClubSearchLoggedInDialog() {
    this.displayClubSearchLoggedInModal = true;
  }

  closeClubSearchLoggedInDialog() {
    this.displayClubSearchLoggedInModal = false;
  }

  fillClubList() {
    this.clubService.getAllClubs().subscribe((response: Club[]) => {
      this.allClubs = response;
    },
      (error) => {
        console.log(error)
      });
  }

  getClubsThatArentFavorited() {
    this.loading = true;

    this.clubService.getUsersFavoritedClubs(+this.cookie.get('studentID')).subscribe((response: Club[]) => {
      this.compareAllClubs = response;
    });

    setTimeout(() => {
      this.clubService.getAllClubs().subscribe(response => {
        this.notFavoritedClubs = response.filter(allClubs => !this.compareAllClubs.find(x => x.clubID === allClubs.clubID));
        this.loading = false;

      })
    }, 1000);


    this.showClubSearchLoggedInDialog();

    console.log(this.notFavoritedClubs)
    console.log(this.compareAllClubs);
  }

  getTopClubs() {
    this.clubService.getTopClubs().subscribe((response: Club[]) => {
      this.topClubs = response;
    },
      (error) => {
        console.log(error);
      });
  }

  favoriteClub(userID: number, clubID: number) {
    this.clubService.favoriteClub(userID, clubID).subscribe()
    this.message = 'Club successfully favorited!';
    this.successMessage = true;
    location.reload();
  }

  removeFromFavorites(userID: number, clubID: number) {
    this.clubService.unfavoriteClub(clubID, userID).subscribe()
    this.message = 'Club successfully unfavorited!';
    this.successMessage = true;
    location.reload();
  }

  getUsersFavoritedClubs() {
    this.clubService.getUsersFavoritedClubs(+this.cookie.get('studentID')).subscribe(response => {
      this.favoritedClubs = response;
    },
      (error) => {
      console.log(error);
      })
  }

  goToClubPage(clubID: number) {
    this.router.navigate(['/clubs/' + clubID]).then();
  }

  onFilterTable(event: Event) {
    this.clubTable.filterGlobal((event.target as HTMLInputElement).value, 'contains');  }

  onFilterTable2(event: Event) {
    this.clubTable2.filterGlobal((event.target as HTMLInputElement).value, 'contains');  }
}
