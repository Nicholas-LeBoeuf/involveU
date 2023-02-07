import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Club} from "../objects/club";
import {User} from "../objects/user";
import {Announcement} from "../objects/announcements";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  insertNewClub(newClub: Club) {
    return this.http.post(environment.apiURL + `club/insertClub`, newClub, {responseType: 'text'});
  }

  createUser(newUser: User){
    return this.http.post(environment.apiURL + `admin/createUser`, newUser, {responseType: 'text'});
  }

  deleteUser(userID: number){
    return this.http.get(environment.apiURL + `admin/deleteUser/${userID}`, {responseType: 'text'});
  }

  assignNewAdvisor(advisorID: number, clubID: number){
    return this.http.get(environment.apiURL + `admin/assignNewAdvisor/${advisorID}/${clubID}`, {responseType: 'text'});
  }

  addEBoardMember(userID: number, clubID: number, role: string) {
    return this.http.get(environment.apiURL + `admin/addNewEboard/${userID}/${clubID}/${role}`, {responseType: 'text'});
  }

  removeEBoardMember(userID: number){
    return this.http.get(environment.apiURL + `admin/deleteEboard/${userID}`, {responseType: 'text'});
  }

  getAllEboard(): Observable<User[]> {
  return this.http.get<User[]>(environment.apiURL + `admin/getAllEboard`);
  }

  getAllNonEboard(): Observable<User[]> {
    return this.http.get<User[]>(environment.apiURL + `admin/getNonEboard`);
  }

  sendImage(file: File)
  {
    console.log(file);
    const data: FormData = new FormData();
    data.append('file', file);
    console.log(data);
    return this.http.post( `http://localhost:8080/api/admin/testImage`, data);
  }

  createOSIAnnouncement(newAnnouncement: Announcement) {
    return this.http.post(environment.apiURL + `announcements/createAnnouncements`, newAnnouncement, {responseType: 'text'});
  }


  getClubLogo(clubID : number) {
    return this.http.get(environment.apiURL + `api/club/getClubLogo/${clubID}`, {responseType: 'blob'});
  }

}
