import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {LoginResponse} from "../models/loginResponse.model";
import {Observable} from "rxjs/internal/Observable";
import {tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    logged = false;
    response: LoginResponse;

    constructor(private http: HttpClient) {
    }

    login(email: string, password: string): Observable<LoginResponse> {
        if (email && password) {
            return this.http.post<LoginResponse>(environment.loginUrl, {
                email: email,
                password: password
            }).pipe(tap(response => {
                if (response.access_token) {
                    this.response = response;
                    this.logged = true;
                }
            }));
        }
    }

    isLoggedIn(): boolean {
        return this.logged;
    }

    logout(): void {
        this.logged = false;
        this.response = undefined;
    }

    getToken(): string {
      if (this.response !== undefined) {
        return this.response.access_token;
      }
    }

}
