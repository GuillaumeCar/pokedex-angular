import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {TrainerService} from '../services/trainer.service';
import {PokemonService} from '../services/pokemon.service';
import {ApiResponse} from '../models/apiResponse.model';
import {forkJoin, Observable} from 'rxjs';

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit, OnChanges {

    team: number[];
    pokemonTeam = [];
    pokemon: ApiResponse;
    @Input() pokemonIdToAdd?: number;

    @ViewChild('alert')
    private alert!: ElementRef;

    constructor(
        private authService: AuthService,
        private trainerService: TrainerService,
        private pokemonService: PokemonService
    ) {
    }

    ngOnInit(): void {
        if (this.authService.isLoggedIn()) {
            this.getTeam();
        }
    }

    getTeam(): void {
        this.pokemonTeam = [];

        this.trainerService.getTeam(this.authService.getToken()).subscribe((result) => {
            this.team = result;
            const forkArray: Observable<any>[] = result.map((id) => this.pokemonService.getPokemons(null, null, id.toString()));
            forkJoin(forkArray).subscribe(team => {
                this.pokemonTeam = team;
            });
        });
    }

    remove(pok: any): void {
        this.removeElementFromArray(this.pokemonTeam, pok);
        this.removeElementFromArray(this.team, pok.data[0].id);
        this.trainerService.setTeam(this.team, this.authService.getToken());
    }

    removeElementFromArray(array: any[], element: any) {
        let isDeleted = false;
        array.forEach((value, index) => {
            if (!isDeleted && value == element) {
                array.splice(index, 1);
                isDeleted = true;
            }
        });
    }

    logout(): void {
        this.authService.logout();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (undefined !== changes.pokemonIdToAdd.currentValue) {
            if (this.team.length < 6) {
                this.team.push(changes.pokemonIdToAdd.currentValue);
                this.trainerService.setTeam(this.team, this.authService.getToken());
                this.pokemonService.getPokemons(null, null, changes.pokemonIdToAdd.currentValue).subscribe(pok => {
                    this.pokemon = pok;
                    this.pokemonTeam.push(this.pokemon);
                });
            } else {
                this.alert.nativeElement.classList.add('show');
                console.log();
            }
        }
    }

    closeModal(): void {
        this.alert.nativeElement.classList.remove('show');
    }
}
