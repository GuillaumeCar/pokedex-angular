import { Component, OnInit } from '@angular/core';
import {PokemonService} from "../services/pokemon.service";
import {Pokemon} from "../models/pokemon.model";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  data: Pokemon[];
  limit = 0;
  limitMax = 151;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.getPokemons(this.limit += 20).subscribe(myResult => {
      this.data = [...myResult.data];
    });
  }

  onScroll(): void {
    if (this.limit < 151) {
      this.pokemonService.getPokemons(this.limit += 20).subscribe(myResult => {
        this.data = [...myResult.data];
      });
    }
  }

}
