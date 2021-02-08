import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginResponse} from "../models/loginResponse.model";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    email = '';
    password = '';
    showLoginWarningMessage = false;
    returnUrl = '';

    constructor(
        private auth: AuthService,
        private router: Router,
        private route: ActivatedRoute) {
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


}
