import {Injectable} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class TrainerService {

    constructor(private http: HttpClient) {
    }

    getTeam(token: string): Observable<number[]> {
        return this.http.get<number[]>()
    }
}
