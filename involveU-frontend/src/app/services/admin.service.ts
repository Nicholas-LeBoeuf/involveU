import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Club} from "../objects/club";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  insertNewClub(newClub: Club){
    return this.http.post(environment.apiURL + `club/insertClub`, newClub);
  }
}
