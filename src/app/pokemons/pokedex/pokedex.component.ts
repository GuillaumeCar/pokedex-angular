import {Component, OnInit} from '@angular/core';
import {Pokemon} from '../models/pokemon.model';

@Component({
    selector: 'app-pokedex',
    templateUrl: './pokedex.component.html',
    styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

    selectedPokemon?: Pokemon;
    pokemonToAdd?: number;

    constructor() {
    }

    ngOnInit(): void {
    }

    onGetPokemonDetails($event: Pokemon): void {
        this.selectedPokemon = $event;
    }

    onAddToTeam($event: number): void {
        if (this.pokemonToAdd && this.pokemonToAdd == $event) {
            this.pokemonToAdd = undefined;
        }
        setTimeout(() => this.pokemonToAdd = $event, 10);
    }
}
