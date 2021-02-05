import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PokemonListComponent} from "./pokemons/pokemon-list/pokemon-list.component";
import {PokemonDetailsComponent} from "./pokemons/pokemon-details/pokemon-details.component";
import {PokedexComponent} from "./pokemons/pokedex/pokedex.component";
import {AuthGuard} from "./auth.guard";
import {LoginComponent} from "./pokemons/login/login.component";
import {TeamComponent} from "./pokemons/team/team.component";

const routes: Routes = [
    {path: 'pokemons', component: PokemonListComponent},
    {path: 'pokedex', component: PokedexComponent},// canActivate: [AuthGuard]},
    {path: 'details/:id', component: PokemonDetailsComponent},
    {path: 'login', component: LoginComponent},
    // {path: 'team', component: TeamComponent},
    {path: '', redirectTo: '/pokedex', pathMatch: 'full'},

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
