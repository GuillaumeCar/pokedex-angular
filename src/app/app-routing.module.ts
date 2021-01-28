import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PokemonListComponent} from "./pokemons/pokemon-list/pokemon-list.component";
import {PokemonDetailsComponent} from "./pokemons/pokemon-details/pokemon-details.component";

const routes: Routes = [
    { path: 'pokemons', component: PokemonListComponent },
    { path: 'details/:id', component : PokemonDetailsComponent },
    { path: '', redirectTo: '/pokemons', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
