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
    showLoginWarningMessage: boolean = false;
    returnUrl: string = '';

    constructor(
        private auth: AuthService,
        private router: Router,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        if (this.auth.isLoggedIn()) {
            //update your logic accordingly
            //this will trigger while user clicks on back button,
            //before naviagting to login page
            alert('You will be logged out');
        }
        this.auth.logout();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'dashboard';
    }

    login() {
        this.showLoginWarningMessage = false;
        this.auth.login(this.email, this.password).subscribe((response: LoginResponse) => {
            console.log(this.auth.isLoggedIn());
            if (this.auth.isLoggedIn()) {
                this.router.navigate([""]);
            } else {
                this.showLoginWarningMessage = true;
            }
        });
    }

}
