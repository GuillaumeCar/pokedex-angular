import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {TrainerService} from '../services/trainer.service';
import {PokemonService} from '../services/pokemon.service';
import {ApiResponse} from "../models/apiResponse.model";

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
        this.trainerService.getTeam(this.authService.getToken()).subscribe(res => {
            this.team = res;
            this.team.forEach(e => {
                this.pokemonService.getPokemons(null, null, e.toString()).subscribe(pok => {
                    this.pokemon = pok;
                    this.pokemonTeam.push(this.pokemon.data[0]);
                    this.pokemonTeam.sort((a, b) => {
                        if (a.id > b.id) {
                            return 1;
                        }
                        if (a.id < b.id) {
                            return -1;
                        }
                        return 0;
                    });
                });
            });
        });
    }

    remove(pok: any): void {
        this.removeElementFromArray(this.pokemonTeam, pok);
        this.removeElementFromArray(this.team, pok.id);
        this.trainerService.setTeam(this.team, this.authService.getToken());
    }

    removeElementFromArray(array: any[], element: any) {
        array.forEach((value,index)=>{
            if(value == element) array.splice(index,1);
        });
    }

    logout(): void {
        this.authService.logout();
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes);
        if (undefined !== changes.pokemonIdToAdd.currentValue) {
            if (this.team.length < 6) {
                this.team.push(changes.pokemonIdToAdd.currentValue);
                this.trainerService.setTeam(this.team, this.authService.getToken());
                this.pokemonService.getPokemons(null, null, changes.pokemonIdToAdd.currentValue).subscribe(pok => {
                    this.pokemon = pok;
                    this.pokemonTeam.push(this.pokemon.data[0]);
                });
            }
        }
    }
}
