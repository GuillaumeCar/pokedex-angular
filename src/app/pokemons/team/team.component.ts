import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {TrainerService} from '../services/trainer.service';
import {PokemonDetails} from '../models/pokemon-details.model';
import {PokemonService} from '../services/pokemon.service';

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

    team: number[];
    pokemonTeam = [];
    pokemon: PokemonDetails;

    constructor(
      private authService: AuthService,
      private trainerService: TrainerService,
      private pokemonService: PokemonService
    ) {
    }

    ngOnInit(): void {
        if (this.authService.isLoggedIn()) {
            this.trainerService.getTeam(this.authService.getToken()).subscribe(res => {
                res.forEach(e => {
                    this.pokemonService.getPokemonInfoById(e).subscribe(pok => {
                        this.pokemon = pok;
                        this.pokemonTeam.push(this.pokemon);
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
    }
}
