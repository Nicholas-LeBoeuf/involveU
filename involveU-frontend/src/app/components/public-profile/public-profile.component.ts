import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import {ProfileService} from "../../services/profile.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {ResponsiveService} from "../../services/responsive.service";
import {Club} from "../../objects/club";
import {ClubService} from "../../services/club.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Events} from "../../objects/events";
import {EventsService} from "../../services/events.service";

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss']
})
export class PublicProfileComponent implements OnInit {
  userProfileInfo: any;
  userProfileImageUrl: SafeUrl | null = null;
  favoritedClubs: Club[] = [];
  userRSVPdEvents: Events[] = [];
  userID: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private clubService: ClubService,
    private eventsService: EventsService,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService,
    public responsiveService: ResponsiveService
  ) {}

  isLoading: boolean = true;
  numberOfRows: number;
  certainEvent: Events[] = [];
  viewMoreInfoDialog: boolean = false;

  ngOnInit(): void {
    this.userID = +this.route.snapshot.paramMap.get('id');
    this.loadUserProfile(this.userID.toString());
    this.loadFavoritedClubs(this.userID.toString());
    this.getUserRSVPdEvents();
  }

  loadUserProfile(userID: string) {
    this.profileService.getUserProfile(+userID).subscribe(
      (data) => {
        this.userProfileInfo = data;
        this.loadUserProfileImage(userID);
      },
      (error) => {
        console.error('Error fetching user profile', error);
      }
    );
  }

  loadUserProfileImage(userID: string) {
    this.profileService.downloadUserProfilePicture(+userID).subscribe(
      fileData => {
        let blob = new Blob([fileData], { type: 'image/jpeg' });
        let objectURL = URL.createObjectURL(blob);
        this.userProfileImageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      error => {
        console.error("Error loading user profile image:", error);
      }
    );
  }

  showViewMoreInfoDialog(SpecificEvent: Events){
    this.certainEvent.push(SpecificEvent);
    this.viewMoreInfoDialog = true;
  }

  loadFavoritedClubs(userID: string) {
    this.clubService.getUsersFavoritedClubs(+userID).subscribe(
      (clubs) => {
        this.favoritedClubs = clubs;
      },
      (error) => {
        console.error("Error loading favorited clubs:", error);
      }
    );
  }

  goToClubPage(clubID: number) {
    this.router.navigate(['/clubs/' + clubID]).then();
  }

  getUserRSVPdEvents() {
    this.isLoading = true; // Set loading to true when the API call starts
    this.eventsService.getUserFutureRSVPdEvents(this.userID).subscribe(
      response => {
        console.log("RSVP Events:", response);
        this.userRSVPdEvents = response;
        console.log(this.userRSVPdEvents);
        this.isLoading = false; // Set loading to false on successful data retrieval
      },
      error => {
        console.error('Error fetching RSVPd events', error);
        this.isLoading = false; // Also set loading to false on error
      }
    );
  }


  removeEventRSVP(eventID: number) {
    this.eventsService.removeEventRSVP(eventID, this.userID).subscribe(
      () => {
        this.toastr.success('Successfully Removed RSVP To Event');
        this.getUserRSVPdEvents(); // Refresh the list of RSVPd events
      },
      error => {
        console.error('Error removing RSVP', error);
        this.toastr.error('Unsuccessful Remove RSVP Attempt');
      }
    );
  }
}
