import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

    constructor(private auth: AuthService) {
    }

    ngOnInit(): void {
        if (this.auth.reponse.access_token) {

        }
    }

}
