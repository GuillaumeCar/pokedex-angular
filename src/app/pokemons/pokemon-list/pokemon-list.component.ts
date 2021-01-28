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
  offset = 0;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe(myResult => {
      this.data = myResult.data;
      this.limit = myResult.limit;
      this.offset = myResult.offset;
    })
  }

}
