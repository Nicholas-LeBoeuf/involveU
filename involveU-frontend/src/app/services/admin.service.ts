import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Club} from "../objects/club";
import {AssignRemoveAdvisor} from "../objects/assignRemoveAdvisor";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  insertNewClub(newClub: Club){
    return this.http.post(environment.apiURL + `club/insertClub`, newClub);
  }
  assignNewAdvisor(advisorID: number, clubID: number){
    return this.http.get(environment.apiURL + `/admin/assignNewAdvisor/${advisorID}/${clubID}`);
  }

  //removeAdvisor(removeAdvisor : AssignRemoveAdvisor){
    //return this.http.get(environment.apiURL + `admin/removeAdvisor/${advisorID}/${clubID}`);
  //}
}
