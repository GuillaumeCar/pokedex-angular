import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TrainerService {

    constructor(private http: HttpClient) {
    }

    getTeam(token: string): Observable<number[]> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' +  token);

        return this.http.get<number[]>(environment.trainerUrl + '/me/team', {headers});
    }

    setTeam(team: number[], token: string): void {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' +  token);
        this.http.put(environment.trainerUrl + '/me/team', team, {headers}).subscribe(response => {
            console.log(response);
        });
    }
}
