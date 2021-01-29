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


@NgModule({
    declarations: [PokemonListComponent, PokemonDetailsComponent, PokedexComponent],
    imports: [
        CommonModule,
        MatListModule,
        MatLineModule,
        MatCardModule,
        MatGridListModule,
        MatChipsModule,
        MatIconModule,
        InfiniteScrollModule,
        MatSidenavModule
    ]
})
export class PokemonsModule {
}
