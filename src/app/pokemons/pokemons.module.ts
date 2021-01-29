import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { PokedexComponent } from './pokedex/pokedex.component';



@NgModule({
  declarations: [PokemonListComponent, PokemonDetailsComponent, PokedexComponent],
  imports: [
    CommonModule
  ]
})
export class PokemonsModule { }
