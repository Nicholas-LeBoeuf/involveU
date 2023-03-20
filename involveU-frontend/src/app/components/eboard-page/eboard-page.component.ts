import {Component, OnInit, ViewChild} from '@angular/core';
import {ClubService} from "../../services/club.service";
import {EventsService} from "../../services/events.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Club} from "../../objects/club";
import {Announcement} from "../../objects/announcements";
import { DatePipe } from '@angular/common';
import {AnnouncementsService} from "../../services/announcements.service";
import {Events} from "../../objects/events";
import {Table} from "primeng/table";
import {EboardService} from "../../services/eboard.service";
import {Title} from "@angular/platform-browser";
import {SocialMedia} from "../../objects/social-media";
import {ResponsiveService} from "../../services/responsive.service";
import {AdminService} from "../../services/admin.service";

@Component({
  selector: 'app-eboard-page',
  templateUrl: './eboard-page.component.html',
  styleUrls: ['./eboard-page.component.scss']
})
export class EboardPageComponent implements OnInit {
  announcementForm : FormGroup;
  editAnnouncementForm: FormGroup;
  socialMediaForm : FormGroup;
  editSocialMediaForm : FormGroup;
  todaysDate = new Date().toString();

  constructor(private clubService: ClubService,
              private formBuilder: FormBuilder,
              private eventsService: EventsService,
              private eboardService: EboardService,
              private adminService: AdminService,
              public responsiveService: ResponsiveService,
              private route: ActivatedRoute,
              private router: Router,
              private announcementsService: AnnouncementsService,
              public cookie: CookieService,
              private datePipe: DatePipe,
              private title: Title) {
    this.title.setTitle("involveU | E-Board")
    this.announcementForm = this.formBuilder.group({
      clubID: [''],
      contentOfAnnouncement: ['', Validators.required],
      expiresOn: [''],
      announcementTitle: ['', Validators.required],
      postedOn: ['']
    })

    this.editAnnouncementForm = this.formBuilder.group({
      editAnnouncementTitle: ['', Validators.required],
      editContentOfAnnouncement: ['', Validators.required],
      editExpiresOn: ['']
    })

    this.socialMediaForm = this.formBuilder.group({
      platformString: ['', Validators.required],
      smLink: ['', Validators.required],
      smProfileName: ['', Validators.required]
    })

    this.editSocialMediaForm = this.formBuilder.group({
      editPlatformString: ['', Validators.required],
      editsmLink: ['', Validators.required],
      editsmProfileName: ['', Validators.required]
    })

    this.todaysDate = this.datePipe.transform(this.todaysDate, 'yyyy-MM-dd');
  }

  //BOOLEANS
  createAnnouncementDialog: boolean = false;
  editAnnouncementDialog: boolean = false;
  addSocialMediaDialog: boolean = false;
  editSocialMediaDialog: boolean = false;
  successMessage: boolean = false;
  failMessage: boolean = false;

  //NUMBERS
  clubID: number;
  userID: number;

  //STRINGS
  message: string;
  clubLogoName: string;

  //OBJECTS
  clubInfo: Club;
  clubEvents: Events[] = [];
  clubAnnouncements: any = {};
  certainAnnouncement: Announcement[] = [];
  clubSocialMedia: SocialMedia[] = [];
  certainSocialMedia: SocialMedia[] = []

  @ViewChild('clubEventTable') clubEventTable: Table;
  @ViewChild('clubAnnouncementTable') clubAnnouncementTable: Table;

  announcementCols = [
    { field: 'announcementTitle', header: 'Title' },
    { field: 'contentOfAnnouncement', header: 'Announcement Content' },
    { field: 'postedOn', header: 'Posted On' },
    { field: 'expiresOn', header: 'Expires On' }
  ]

  platformList = [
    {name: 'Facebook'},
    {name: 'Instagram'},
    {name: 'Snapchat'},
    {name: 'Twitter'},
    {name: 'TikTok'},
    {name: 'Website'},
    {name: 'YouTube'},
  ]

  platformString: FormControl = new FormControl(null);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.clubID = params['id'];
    });
    this.userID = +this.cookie.get('studentID');
    this.getClubInfo();
    this.getClubEvents();
    this.getClubAnnouncements();
    this.getClubSocialMedia();
  }

  getClubInfo() {
    this.clubService.getSpecificClub(this.clubID).subscribe(response => {
      this.clubInfo = response;
      this.clubLogoName = response.clubLogo;
      console.log(response);
      this.clubService.getClubLogo(this.clubInfo.clubID).subscribe(logo => {
        const reader = new FileReader();
        reader.onload = (e) => this.clubInfo.clubLogo = e.target.result;
        reader.readAsDataURL(new Blob([logo]));
        this.clubInfo.clubLogo = logo;
      })
    })
  }

  getClubEvents() {
    this.eventsService.getSpecificClubEvents(this.clubID).subscribe(response => {
      this.clubEvents = response;
    })
  }

  getClubAnnouncements() {
    this.announcementsService.getClubAnnouncements(this.clubID).subscribe(response => {
      this.clubAnnouncements = response;
      console.log(response);
    })
  }

  get announcementFormInputs()
  {
    return this.announcementForm.controls;
  }

  createAnnouncementSubmit() {
    const newAnnouncement: Announcement = {clubID: this.clubID, contentOfAnnouncement: this.announcementForm.value.contentOfAnnouncement, expiresOn: this.announcementForm.value.expiresOn, announcementTitle: this.announcementForm.value.announcementTitle, postedOn: this.todaysDate};
    console.log(newAnnouncement);
    this.announcementsService.createAnnouncement(newAnnouncement).subscribe(success =>{
        console.log(success);
        location.reload();
      },
      (error) => {
        console.log(error);
      });
  }

  updateClubAnnouncementSubmit() {
    const updatedAnnouncement: Announcement = {announcementID: this.certainAnnouncement[0].announcementID, clubID: this.clubID, contentOfAnnouncement: this.editAnnouncementForm.value.editContentOfAnnouncement, expiresOn: this.editAnnouncementForm.value.editExpiresOn, announcementTitle: this.editAnnouncementForm.value.editAnnouncementTitle, postedOn: this.todaysDate};
    this.announcementsService.updateAnnouncement(updatedAnnouncement).subscribe(success => {
      console.log(success);
      location.reload();
    },
      (error) => {
      console.log(updatedAnnouncement);
      console.log(error);
    });
  }

  onFilterEventName(event: Event) {
    this.clubEventTable.filterGlobal((event.target as HTMLInputElement).value.toString(), 'contains');
  }

  onFilterAnnouncements(announcement: Event) {
    this.clubAnnouncementTable.filterGlobal((announcement.target as HTMLInputElement).value.toString(), 'contains');
  }

  showCreateAnnouncementDialog()
  {
    this.createAnnouncementDialog = true;
  }

  closeCreateAnnouncementDialog()
  {
    this.createAnnouncementDialog = false;
  }

  showEditAnnouncementDialog(SpecificAnnouncement: Announcement) {
    this.certainAnnouncement.push(SpecificAnnouncement);
    console.log(SpecificAnnouncement);
    this.editAnnouncementDialog = true;
  }

  closeEditAnnouncementDialog() {
    this.certainAnnouncement = [];
    this.editAnnouncementDialog = false;
  }

  deleteAnnouncement(announcementID: number) {
    this.announcementsService.deleteAnnouncement(announcementID).subscribe(response => {
      console.log(response);
    })
    location.reload();
  }

  goToLink(url: string){
    window.open(url, "_blank");
  }

  getClubSocialMedia() {
    this.eboardService.getClubSocialMedia(this.clubID).subscribe(response => {
      this.clubSocialMedia = response;
      console.log(response);
    })
  }

  showAddSocialMediaDialog()
  {
    this.addSocialMediaDialog = true;
  }

  closeAddSocialMediaDialog()
  {
    this.addSocialMediaDialog = false;
  }

  showEditSocialMediaDialog(event)
  {
    this.certainSocialMedia.push(event);
    this.editSocialMediaDialog = true;
  }

  closeEditSocialMediaDialog()
  {
    this.certainSocialMedia = [];
    this.editSocialMediaDialog = false;
  }

  addSocialMedia() {
    const newSocialMedia: SocialMedia = {platform: this.platformString.value, profileName: this.socialMediaForm.value.smProfileName, link: this.socialMediaForm.value.smLink, clubID: this.clubID};

    this.eboardService.addNewSocialMedia(newSocialMedia).subscribe(response => {
      console.log(response);
    },
    (error) => {
      if(error.status === 200) {
        this.addSocialMediaDialog = false;
        this.getClubSocialMedia();
      }
      else {
        console.log(error);
      }
    });
  }

  editSocialMedia() {
    const editSocialMedia: SocialMedia = {socialMediaID: this.certainSocialMedia[0].socialMediaID, platform: this.platformString.value, profileName: this.editSocialMediaForm.value.editsmProfileName, link: this.editSocialMediaForm.value.editsmLink, clubID: this.clubID};

    this.eboardService.editSocialMedia(editSocialMedia).subscribe(response => {
        console.log(response);
      },
      (error) => {
        if (error.status === 200) {
          this.editSocialMediaDialog = false;
          this.getClubSocialMedia();
        }
        else {
          console.log(error);
        }
      });
  }

  deleteSocialMedia(socialMedia: SocialMedia) {
    this.eboardService.deleteSocialMedia(socialMedia.socialMediaID).subscribe(response => {
      console.log(response);
    },
      (error) => {
        if (error.status === 200) {
          this.getClubSocialMedia();
        }
        else {
          console.log(error);
        }
      })
  }

  onUpload(event) {
    const file:File = event.files[0];
    this.clubInfo.clubfile = event.files[0];
    this.eboardService.updateImage(this.clubInfo,file).subscribe(response => {
      console.log(response);
    })
  }

  isCreateAnnouncementFormValid() {
    if (this.announcementForm.value.announcementTitle === '' || this.announcementForm.value.contentOfAnnouncement === '' || this.announcementForm.value.expiresOn === '') {
      return true;
    }
    else {
      return false;
    }
  }

  isEditAnnouncementFormValid() {
    if (this.editAnnouncementForm.value.editAnnouncementTitle === '' || this.editAnnouncementForm.value.editContentOfAnnouncement === '' || this.editAnnouncementForm.value.editExpiresOn === '') {
      return true;
    }
    else {
      return false;
    }
  }

  isCreateSocialMediaFormValid() {
    if (this.platformString.value === null || this.socialMediaForm.value.smProfileName === '' || this.socialMediaForm.value.smLink === '') {
      return true;
    }
    else {
      return false;
    }
  }

  isEditSocialMediaFormValid() {
    if (this.platformString.value === null || this.editSocialMediaForm.value.editsmProfileName === '' || this.editSocialMediaForm.value.editsmLink === '') {
      return true;
    }
    else {
      return false;
    }
  }
}
