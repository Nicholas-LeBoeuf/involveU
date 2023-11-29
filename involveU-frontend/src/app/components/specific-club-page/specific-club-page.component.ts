import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ClubService} from "../../services/club.service";
import {Club} from "../../objects/club";
import {CookieService} from "ngx-cookie-service";
import {Events} from "../../objects/events";
import {User} from "../../objects/user";
import {EventsService} from "../../services/events.service";
import {FormBuilder} from "@angular/forms";
import {Table} from "primeng/table";
import {EboardService} from "../../services/eboard.service";
import {AnnouncementsService} from "../../services/announcements.service";
import {Announcement} from "../../objects/announcements";
import {ResponsiveService} from "../../services/responsive.service";
import {Title} from "@angular/platform-browser";
import {SocialMedia} from "../../objects/social-media";
import {ToastrService} from "ngx-toastr";
import {ClubMembers} from "../../objects/club-members";

@Component({
  selector: 'app-specific-club-page',
  templateUrl: './specific-club-page.component.html',
  styleUrls: ['./specific-club-page.component.scss']
})
export class SpecificClubPageComponent implements OnInit {

  constructor(private clubService: ClubService,
              private eventsService: EventsService,
              private eboardService: EboardService,
              public responsiveService: ResponsiveService,
              private announcementsService: AnnouncementsService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService,
              public cookie: CookieService,
              private title: Title) {
    this.title.setTitle("involveU | Club")
  }

  //BOOLEANS
  isLoggedIn: boolean = false;
  clubIsFav: boolean = false;
  viewMoreInfoDialog: boolean = false;
  viewCertainAnnouncementDialog: boolean = false;
  viewAllAnnouncementsDialog: boolean = false;
  showMore: boolean = false;
  isLoading: boolean = true;

  //NUMBERS
  clubID: number;
  userID: number;
  numberOfRows: number;

  //STRINGS

  //OBJECTS
  clubMembers: User[] = [];
  clubInfo: Club;
  favoritedClubs: Club[] = [];
  clubEboard: User[] = [];
  clubEvents: Events[] = [];
  certainEvent: Events[] = [];
  userRSVPdEvents: Events[] = [];
  clubAnnouncements: Announcement[] = [];
  clubSocialMedia: SocialMedia[] = [];
  certainAnnouncement: Announcement[] = [];
  favoritedUsers: User[] = [];

  @ViewChild('clubEventTable') clubEventTable: Table;



  ngOnInit(): void {
    this.isLoading = true;

    this.route.params.subscribe(params => {
      this.clubID = params['id'];
    });

    this.userID = +this.cookie.get('studentID');

    if (this.responsiveService.deviceDesktop()) {
      this.numberOfRows = 2;
    }
    else {
      this.numberOfRows = 1;
    }

    this.getClubMembers();
    this.getClubEvents();
    this.isUserLoggedIn();
    this.getClubInfo();
    this.getUsersFavoritedClubs();
    this.getEboard();
    this.getUserRSVPdEvents();
    this.getClubAnnouncements();
    this.getClubSocialMedia();

    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  isUserLoggedIn() {
    this.isLoggedIn = this.userID !== 0;
  }

  getClubInfo() {
    this.clubService.getSpecificClub(this.clubID).subscribe(response => {
      this.clubInfo = response;
      this.clubService.getClubLogo(this.clubInfo.clubID).subscribe(logo => {
        const reader = new FileReader();
        reader.onload = (e) => this.clubInfo.clubLogo = e.target.result;
        reader.readAsDataURL(new Blob([logo]));
        this.clubInfo.clubLogo = logo;
      })
    })
  }
  getUsersFavoritedClubs() {
    this.clubService.getUsersFavoritedClubs(+this.cookie.get('studentID')).subscribe(response => {
        this.favoritedClubs = response;
        this.isClubFavorited();
      },
      (error) => {
        console.log(error);
      })
  }

  isClubFavorited() {
    for (let i = 0; i < this.favoritedClubs.length; i++ ) {
      if (this.favoritedClubs[i].clubID === +this.clubID)
      {
        this.clubIsFav = true;
      }
    }
  }

  favoriteClub() {
    this.clubService.favoriteClub(this.userID, this.clubID).subscribe(response => {
    },
      error => {
        this.toastr.error('Unsuccessful Favorite Club Attempt', undefined, {positionClass: 'toast-top-center', progressBar: true});
      },
      () => {
        this.toastr.success('Successfully Favorited Club', undefined, {positionClass: 'toast-top-center', progressBar: true});
        location.reload();
      });
  }

  removeFromFavorites() {
    this.clubService.unfavoriteClub(this.clubID, this.userID).subscribe(response => {

    },
      error => {
        this.toastr.error('Unsuccessful Unfavorite Club Attempt', undefined, {positionClass: 'toast-top-center', progressBar: true});
      },
      () => {
        this.toastr.success('Successfully Unfavorited Club', undefined, {positionClass: 'toast-top-center', progressBar: true});
        location.reload();
      });
  }

  getClubEvents() {
    this.eventsService.getSpecificClubEvents(this.clubID).subscribe(response => {
      this.clubEvents = response;
      for(let i = 0; i < this.clubEvents.length; i++) {
        this.clubService.getClubLogo(this.clubEvents[i].clubID).subscribe(logo => {
          const reader = new FileReader();
          reader.onload = (e) => this.clubEvents[i].clubLogo = e.target.result;
          reader.readAsDataURL(new Blob([logo]));
          this.clubEvents[i].clubLogo = logo;
        })
      }
    })
  }

  getEboard()
  {
    this.clubService.getClubEboard(this.clubID).subscribe(response => {
      this.clubEboard = response;
    })
  }

  showViewMoreInfoDialog(SpecificEvent: Events){
    this.certainEvent.push(SpecificEvent);
    this.viewMoreInfoDialog = true;
  }

  closeViewMoreInfoDialog(){
    this.certainEvent = [];
    this.viewMoreInfoDialog = false;
  }

  getUserRSVPdEvents() {
    this.eventsService.getUserRSVPdEvents(this.userID).subscribe(response => {
      this.userRSVPdEvents = response;
    })
  }

  isUserRSVPd(eventID: number): boolean {
    return this.userRSVPdEvents.some(event => event.eventID === eventID);
  }

  eventRSVP(eventID: number, clubID:number) {
    this.eventsService.rsvpToEvent(eventID, this.userID,clubID).subscribe(response => {

    },
      error => {
        this.toastr.error('Unsuccessful RSVP Attempt', undefined, {positionClass: 'toast-top-center', progressBar: true});
      },
      () => {
        this.toastr.success('Successfully RSVPd To Event', undefined, {positionClass: 'toast-top-center', progressBar: true});
        location.reload();
      });
  }

  removeEventRSVP(eventID: number) {
    this.eventsService.removeEventRSVP(eventID, this.userID).subscribe(response => {
    },
      error => {
        this.toastr.error('Unsuccessful Remove RSVP Attempt', undefined, {positionClass: 'toast-top-center', progressBar: true});
      },
      () => {
        this.toastr.success('Successfully Removed RSVP To Event', undefined, {positionClass: 'toast-top-center', progressBar: true});
        location.reload();
      });
  }


  getClubAnnouncements() {
    this.announcementsService.getClubAnnouncements(+this.clubID).subscribe(response => {
      this.clubAnnouncements = response;
      },
      (error) => {
        console.log(error)
      });
  }

  getClubSocialMedia() {
    this.eboardService.getClubSocialMedia(+this.clubID).subscribe(response => {
      this.clubSocialMedia = response;
    })
  }

  goToLink(url: string){
    window.open(url, "_blank");
  }

  showViewCertainAnnouncementDialog(announcement: Announcement) {
    this.certainAnnouncement.push(announcement);
    this.viewCertainAnnouncementDialog = true;
  }

  closeViewCertainAnnouncementDialog() {
    this.certainAnnouncement = [];
    this.viewCertainAnnouncementDialog = false;
  }

  showAllAnnouncementsDialog() {
    this.viewAllAnnouncementsDialog = true;
  }

  closeAllAnnouncementsDialog() {
    this.viewAllAnnouncementsDialog = false;
  }

  getClubMembers(){
    this.clubService.getMembersOfClub(+this.clubID).subscribe(response => {
      this.clubMembers = response;
    })
  }

  goToPublicProfile(studentid: number){
    this.router.navigate(['/public-profile/' + studentid]).then();
  }
}


