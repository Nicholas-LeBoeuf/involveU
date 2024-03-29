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
import {ToastrService} from "ngx-toastr";
import {User} from "../../objects/user";

@Component({
  selector: 'app-eboard-page',
  templateUrl: './eboard-page.component.html',
  styleUrls: ['./eboard-page.component.scss']
})
export class EboardPageComponent implements OnInit {
  //Initializing forms
  announcementForm : FormGroup;
  editAnnouncementForm: FormGroup;
  socialMediaForm : FormGroup;
  editSocialMediaForm : FormGroup;
  editClubBioForm: FormGroup;
  editClubVisionForm: FormGroup;
  editClubMissionForm: FormGroup;
  editClubValuesForm: FormGroup;
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
              private title: Title,
              private toastr: ToastrService) {
    this.title.setTitle("involveU | E-Board")
    //Setting form variables (Lines 53-92)
    this.announcementForm = this.formBuilder.group({
      clubID: [''],
      contentOfAnnouncement: ['', Validators.required],
      expiresOn: ['', Validators.required],
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

    this.editClubBioForm = this.formBuilder.group({
      editClubBio: ['', Validators.required]
    })

    this.editClubVisionForm = this.formBuilder.group({
      editClubVision: ['', Validators.required]
    })

    this.editClubMissionForm = this.formBuilder.group({
      editClubMission: ['', Validators.required]
    })

    this.editClubValuesForm = this.formBuilder.group({
      editClubValues: ['', Validators.required]
    })

    this.todaysDate = this.datePipe.transform(this.todaysDate, 'yyyy-MM-dd');
  }

  //BOOLEANS
  createAnnouncementDialog: boolean = false;
  editAnnouncementDialog: boolean = false;
  addSocialMediaDialog: boolean = false;
  editSocialMediaDialog: boolean = false;
  editClubBioDialog: boolean = false;
  editClubVisionDialog: boolean = false;
  editClubMissionDialog: boolean = false;
  editClubValuesDialog: boolean = false;
  isInEboard: boolean = false;

  //NUMBERS
  clubID: number;
  userID: number;

  //STRINGS
  clubLogoName: string;

  //OBJECTS
  clubInfo: Club;
  clubEvents: Events[] = [];
  clubAnnouncements: any = {};
  certainAnnouncement: Announcement[] = [];
  clubSocialMedia: SocialMedia[] = [];
  certainSocialMedia: SocialMedia[] = []
  clubEboard: User[] = [];

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
    this.getEboard();
  }

  getClubInfo() {
    this.clubService.getSpecificClub(this.clubID).subscribe(response => {
      this.clubInfo = response;
      this.clubLogoName = response.clubLogo;
      this.clubService.getClubLogo(this.clubInfo.clubID).subscribe(logo => {
        const reader = new FileReader();
        reader.onload = (e) => this.clubInfo.clubLogo = e.target.result;
        reader.readAsDataURL(new Blob([logo]));
        this.clubInfo.clubLogo = logo;
      })
    })
  }

  getClubEvents() {
    this.eboardService.getClubEventInformation(this.clubID).subscribe(response => {
      this.clubEvents = response;
    })
  }

  getClubAnnouncements() {
    this.announcementsService.getClubAnnouncements(this.clubID).subscribe(response => {
      this.clubAnnouncements = response;
    })
  }

  getEboard() {
    this.clubService.getClubEboard(this.clubID).subscribe(response => {
      this.clubEboard = response;
    },
      error => {
        console.log(error);
      },
      ()=> {
        this.checkIfInEboard();
   })
  }

  checkIfInEboard() {
    for(let x = 0; x < this.clubEboard.length; x++) {
      if(this.userID === this.clubEboard[x].studentID) {
        this.isInEboard = true;
      }
    }
  }

  createAnnouncementSubmit() {
    const newAnnouncement: Announcement = {clubID: this.clubID, contentOfAnnouncement: this.announcementForm.value.contentOfAnnouncement, expiresOn: this.announcementForm.value.expiresOn, announcementTitle: this.announcementForm.value.announcementTitle, postedOn: this.todaysDate};
    this.announcementsService.createAnnouncement(newAnnouncement).subscribe(success =>{
      },
      error => {
        this.toastr.error('Unsuccessful Announcement Creation Attempt', undefined, {positionClass: 'toast-top-center', progressBar: true});
      },
      () => {
        this.toastr.success('Successfully Created Announcement', undefined, {positionClass: 'toast-top-center', progressBar: true});
        this.announcementForm.reset();
        this.createAnnouncementDialog = false;
        this.getClubAnnouncements();
      });
  }

  updateClubAnnouncementSubmit() {
    const updatedAnnouncement: Announcement = {announcementID: this.certainAnnouncement[0].announcementID, clubID: this.clubID, contentOfAnnouncement: this.editAnnouncementForm.value.editContentOfAnnouncement, expiresOn: this.editAnnouncementForm.value.editExpiresOn, announcementTitle: this.editAnnouncementForm.value.editAnnouncementTitle, postedOn: this.todaysDate};
    this.announcementsService.updateAnnouncement(updatedAnnouncement).subscribe(success => {

    },
      error => {
        this.toastr.error('Unsuccessful Announcement Edit Attempt', undefined, {positionClass: 'toast-top-center', progressBar: true});
      },
      () => {
        this.toastr.success('Successfully Edited Announcement', undefined, {positionClass: 'toast-top-center', progressBar: true});
        this.editAnnouncementForm.reset();
        this.editAnnouncementDialog = false;
        this.getClubAnnouncements();
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
    this.editAnnouncementDialog = true;
  }

  closeEditAnnouncementDialog() {
    this.certainAnnouncement = [];
    this.editAnnouncementDialog = false;
  }

  deleteAnnouncement(announcementID: number) {
    this.announcementsService.deleteAnnouncement(announcementID).subscribe(response => {
    },
      error => {
        this.toastr.error('Unsuccessful Announcement Deletion Attempt', undefined, {positionClass: 'toast-top-center', progressBar: true});
      },
      () => {
        this.toastr.success('Successfully Deleted Announcement', undefined, {positionClass: 'toast-top-center', progressBar: true});
        this.getClubAnnouncements();
      });
  }

  goToLink(url: string){
    window.open(url, "_blank");
  }

  getClubSocialMedia() {
    this.eboardService.getClubSocialMedia(this.clubID).subscribe(response => {
      this.clubSocialMedia = response;
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

  showEditClubBioDialog()
  {
    this.editClubBioDialog = true;
  }

  closeEditClubBioDialog()
  {
    this.editClubBioDialog = false;
  }

  showEditClubVisionDialog()
  {
    this.editClubVisionDialog = true;
  }

  closeEditClubVisionDialog()
  {
    this.editClubVisionDialog = false;
  }

  showEditClubMissionDialog()
  {
    this.editClubMissionDialog = true;
  }

  closeEditClubMissionDialog()
  {
    this.editClubMissionDialog = false;
  }

  showEditClubValuesDialog()
  {
    this.editClubValuesDialog = true;
  }

  closeEditClubValuesDialog()
  {
    this.editClubValuesDialog = false;
  }

  addSocialMedia() {
    const newSocialMedia: SocialMedia = {platform: this.platformString.value, profileName: this.socialMediaForm.value.smProfileName, link: this.socialMediaForm.value.smLink, clubID: this.clubID};

    this.eboardService.addNewSocialMedia(newSocialMedia).subscribe(response => {

    },
      error => {
        this.toastr.error('Unsuccessful Social Media Creation Attempt', undefined, {positionClass: 'toast-top-center', progressBar: true});
      },
      () => {
        this.toastr.success('Successfully Created Social Media', undefined, {positionClass: 'toast-top-center', progressBar: true});
        this.socialMediaForm.reset();
        this.platformString.reset();
        this.addSocialMediaDialog = false;
        this.getClubSocialMedia();
      });
  }

  editSocialMedia() {
    const editSocialMedia: SocialMedia = {socialMediaID: this.certainSocialMedia[0].socialMediaID, platform: this.platformString.value, profileName: this.editSocialMediaForm.value.editsmProfileName, link: this.editSocialMediaForm.value.editsmLink, clubID: this.clubID};

    this.eboardService.editSocialMedia(editSocialMedia).subscribe(response => {
      },
      error => {
        this.toastr.error('Unsuccessful Social Media Edit Attempt', undefined, {positionClass: 'toast-top-center', progressBar: true});
      },
      () => {
        this.toastr.success('Successfully Edited Social Media', undefined, {positionClass: 'toast-top-center', progressBar: true});
        this.editSocialMediaForm.reset();
        this.platformString.reset();
        this.editSocialMediaDialog = false;
        this.getClubSocialMedia();
      });
  }

  deleteSocialMedia(socialMedia: SocialMedia) {
    this.eboardService.deleteSocialMedia(socialMedia.socialMediaID).subscribe(response => {
    },
      error => {
        this.toastr.error('Unsuccessful Social Media Deletion Attempt', undefined, {positionClass: 'toast-top-center', progressBar: true});
      },
      () => {
        this.toastr.success('Successfully Deleted Social Media', undefined, {positionClass: 'toast-top-center', progressBar: true});
        this.getClubSocialMedia();
      });
  }
  //Updates all club data in one function
  updateClubData() {
    const updateClubData : Club = {advisorID: this.clubInfo.advisorID, clubAffiliation: this.clubInfo.clubAffiliation, clubBio: this.editClubBioForm.value.editClubBio, clubMission: this.editClubMissionForm.value.editClubMission, clubName: this.clubInfo.clubName, clubValues: this.editClubValuesForm.value.editClubValues, clubVision: this.editClubVisionForm.value.editClubVision, ownerID: this.clubInfo.ownerID, clubID: this.clubID};
    this.eboardService.editClubData(updateClubData).subscribe(response => {
        this.editClubBioDialog = false;
        this.editClubVisionDialog = false;
        this.editClubMissionDialog = false;
        this.editClubValuesDialog = false;
      },
      error => {
        this.toastr.error('Unsuccessful Club Info Edit Attempt', undefined, {positionClass: 'toast-top-center', progressBar: true});
      },
      () => {
        this.toastr.success('Successfully Edited Club Info', undefined, {positionClass: 'toast-top-center', progressBar: true});
        this.getClubInfo();
        this.editClubBioDialog = false;
        this.editClubVisionDialog = false;
        this.editClubMissionDialog = false;
        this.editClubValuesDialog = false;
      });
  }

  onUpload(event) {
    const file:File = event.files[0];
    this.clubInfo.clubfile = event.files[0];
    this.eboardService.checkClubLogoPath(file.name,this.clubInfo.clubID).subscribe(response=>{
    })
    this.eboardService.updateImage(this.clubInfo.clubID,file).subscribe(response => {
    },
      error => {
        console.log(error);
        this.toastr.error('Unsuccessful Logo Upload Attempt', undefined, {positionClass: 'toast-top-center', progressBar: true});
      },
      () => {
        this.toastr.success('Successfully Updated Club Logo', undefined, {positionClass: 'toast-top-center', progressBar: true});
        this.getClubInfo();
      });
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

  isEditClubBioFormValid() {
    if (this.editClubBioForm.value.editClubBio === '') {
      return true;
    }
    else {
      return false;
    }
  }

  isEditClubVisionFormValid() {
    if (this.editClubVisionForm.value.editClubVision === '') {
      return true;
    }
    else {
      return false;
    }
  }

  isEditClubMissionFormValid() {
    if (this.editClubMissionForm.value.editClubMission === '') {
      return true;
    }
    else {
      return false;
    }
  }

  isEditClubValuesFormValid() {
    if (this.editClubValuesForm.value.editClubValues === '') {
      return true;
    }
    else {
      return false;
    }
  }
}
