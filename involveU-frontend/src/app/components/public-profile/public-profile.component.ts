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
  ) {
  }

  ngOnInit(): void {
    const userID = this.route.snapshot.paramMap.get('id');
    console.log('UserID:', userID); // Check if the userID is being retrieved correctly
    this.loadUserProfile(userID);
  }


  loadUserProfile(userID: string | null) {
    if (userID) {
      this.profileService.getUserProfile(+userID).subscribe(
        (data) => {
          console.log(data); // Check the structure and data of the userProfileInfo
          this.userProfileInfo = data;
        },
        (error) => {
          console.error('Error fetching user profile', error);
        }
      );
    }
  }
}
