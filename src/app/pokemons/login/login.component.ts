import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {LoginResponse} from "../models/loginResponse.model";
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    email = environment.email;
    password = environment.password;
    showLoginWarningMessage = false;

    constructor(
        private auth: AuthService,
        private router: Router) {
    }

    ngOnInit(): void {
    }

    login(): void {
        this.showLoginWarningMessage = false;
        this.auth.login(this.email, this.password).subscribe((response: LoginResponse) => {
            if (this.auth.isLoggedIn()) {
                this.router.navigate(['']);
            } else {
                this.showLoginWarningMessage = true;
            }
        });
    }

    register(): void {
        this.auth.register(this.email, this.password).subscribe((response: LoginResponse) => {
            if (this.auth.isLoggedIn()) {
                this.router.navigate(['']);
            } else {
                this.showLoginWarningMessage = true;
            }
        });
    }


}
