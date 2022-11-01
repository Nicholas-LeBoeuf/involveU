import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Club} from "../objects/club";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  insertNewClub(newClub: Club): Observable<Club>{
    return this.http.post<Club>(environment.apiURL + `club/insertClub`, newClub);
  }
}
