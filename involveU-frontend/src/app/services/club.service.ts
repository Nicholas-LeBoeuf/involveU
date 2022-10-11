import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Club} from "../objects/club";

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  constructor(private http: HttpClient ) { }
  insertNewClub(newClub: Club): Observable<Club>{
    return this.http.post<Club>(environment.apiURL + `club/insertClub`, newClub);
  }
}
