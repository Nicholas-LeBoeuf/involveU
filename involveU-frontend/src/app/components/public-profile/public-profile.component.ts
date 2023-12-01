import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ProfileService } from '../../services/profile.service';
import { ClubService } from '../../services/club.service'; // Import the ClubService
import { Club } from '../../objects/club'; // Assuming you have a Club model


@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss']
})
export class PublicProfileComponent implements OnInit {
  userProfileInfo: any;
  userProfileImageUrl: SafeUrl | null = null;
  favoritedClubs: Club[] = []; // Add this property

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private clubService: ClubService, // Inject the ClubService
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const userID = this.route.snapshot.paramMap.get('id');
    this.loadUserProfile(userID);
    this.loadFavoritedClubs(userID); // Add this call
  }

  loadUserProfile(userID: string | null) {
    if (userID) {
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

  loadFavoritedClubs(userID: string | null) {
    if (userID) {
      this.clubService.getUsersFavoritedClubs(+userID).subscribe(
        (clubs) => {
          this.favoritedClubs = clubs;
        },
        (error) => {
          console.error("Error loading favorited clubs:", error);
        }
      );
    }
  }

  goToClubPage(clubID: number) {
    this.router.navigate(['/clubs/' + clubID]).then();
  }

  // You can add goToClubPage method if needed
}
