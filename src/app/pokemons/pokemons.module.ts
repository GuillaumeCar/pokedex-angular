import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PokemonListComponent} from './pokemon-list/pokemon-list.component';
import {PokemonDetailsComponent} from './pokemon-details/pokemon-details.component';
import {PokedexComponent} from './pokedex/pokedex.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatLineModule} from "@angular/material/core";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { TeamComponent } from './team/team.component';


@NgModule({
    declarations: [PokemonListComponent, PokemonDetailsComponent, PokedexComponent, LoginComponent, TeamComponent],
    imports: [
        CommonModule,
        MatListModule,
        MatLineModule,
        MatCardModule,
        MatGridListModule,
        MatChipsModule,
        MatIconModule,
        InfiniteScrollModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule
    ]
})
export class PokemonsModule {
}
