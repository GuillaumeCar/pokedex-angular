import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LoginResponse} from "../models/loginResponse.model";
import {AuthService} from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class TrainerService {

    constructor(private http: HttpClient, private authService: AuthService) {
    }

    getTeam(token: string): Observable<number[]> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' +  token);
        return this.http.get<number[]>(environment.trainerUrl + '/me/team', {headers});
    }

    setTeam(team: number[], token: string): void {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' +  token);
        this.http.put<LoginResponse>(environment.trainerUrl + '/me/team', team, {headers}).subscribe(response => {
            if (null !== response && response.statusCode == "401") {
                if (this.authService.refresh()) {
                    this.setTeam(team, token);
                }
            }
        });
    }
}
