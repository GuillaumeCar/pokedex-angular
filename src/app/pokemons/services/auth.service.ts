import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {LoginResponse} from "../models/loginResponse.model";
import {Observable} from "rxjs/internal/Observable";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    expiration: any;

    constructor(private http: HttpClient, private router: Router) {
    }

    login(email?: string, password?: string, refreshToken?: string): Observable<LoginResponse> {
        if (email && password) {
            return this.http.post<LoginResponse>(environment.authUrl + '/login', {
                email: email,
                password: password
            }).pipe(tap(response => {
                if (response.access_token) {
                    localStorage.setItem("t", response.access_token);
                    localStorage.setItem("r", response.refresh_token);
                    localStorage.setItem("e", response.expire_in);
                }
                this.expiration = setTimeout(() => this.tokenExpired(), parseInt(localStorage.getItem("e")));
            }));
        }
    }

    isLoggedIn(): boolean {
        return localStorage.getItem("t") != null;
    }

    logout(): void {
        localStorage.clear();
        this.router.navigate(['/login']);
    }

    getToken(): string {
      if (localStorage.getItem("t") !== undefined) {
        return localStorage.getItem("t");
      }
    }

    getRefreshToken(): string {
        if (localStorage.getItem("r") !== undefined) {
            return localStorage.getItem("r");
        }
        return null;
    }

    refresh(): boolean {
        if (null !== this.getRefreshToken()) {
            clearTimeout(this.expiration);
            this.http.post<LoginResponse>(environment.authUrl + '/refresh', {refresh_token: this.getRefreshToken()}).pipe(tap(response => {
                if (response.access_token) {
                    localStorage.setItem("t", response.access_token);
                    localStorage.setItem("r", response.refresh_token);
                    localStorage.setItem("e", response.expire_in);
                    this.expiration = setTimeout(() => this.tokenExpired(), parseInt(localStorage.getItem("e")));
                }
            }));
        }
        return false
    }

    tokenExpired(): void {
        if (null !== this.getRefreshToken()) {
            this.refresh();
        } else {
            localStorage.clear();
            this.router.navigate(['/login']);
        }
    }
}
