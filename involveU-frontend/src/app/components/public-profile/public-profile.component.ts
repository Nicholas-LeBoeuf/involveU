import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../services/profile.service'; // Corrected import

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss']
})
export class PublicProfileComponent implements OnInit {
  userProfileInfo: any; // Adjust as per your User model

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService // Use ProfileService
  ) {}

  ngOnInit(): void {
    const userID = this.route.snapshot.paramMap.get('id'); // Get 'id' from the route
    this.loadUserProfile(userID);
  }

  loadUserProfile(userID: string | null) {
    if (userID) {
      this.profileService.getUserProfile(+userID).subscribe( // Use ProfileService
        (data) => {
          this.userProfileInfo = data;
        },
        (error) => {
          console.error('Error fetching user profile', error);
          // Handle errors here (e.g., user not found)
        }
      );
    }
  }
}
