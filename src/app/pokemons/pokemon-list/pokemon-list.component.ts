import {
    Component, ElementRef,
    EventEmitter,
    OnInit,
    Output, ViewChild
} from '@angular/core';
import {PokemonService} from "../services/pokemon.service";
import {Pokemon} from "../models/pokemon.model";
import {debounceTime, map} from "rxjs/operators";
import {fromEvent} from "rxjs/internal/observable/fromEvent";

@Component({
    selector: 'app-pokemon-list',
    templateUrl: './pokemon-list.component.html',
    styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

    data: Pokemon[];
    limit = 20;
    limitMax = 151;
    search!: string;

    @ViewChild('searchBox')
    private searchBox!: ElementRef;

    @Output() getPokemonDetailsEmitter = new EventEmitter<Pokemon>();

    constructor(private pokemonService: PokemonService) {
    }

    ngOnInit(): void {
        this.pokemonService.getPokemons(this.limit).subscribe(myResult => {
            this.data = [...myResult.data];
        });
    }

    ngAfterViewInit(): void {
        fromEvent(this.searchBox.nativeElement, 'keyup').pipe(
            map((i: any) => i.currentTarget.value),
            debounceTime(250)
        ).subscribe((v) => {
            if (v !== '') {
                this.pokemonService.getPokemonsBySearch(v).subscribe((myResult) => {
                    this.data = myResult.data;
                });
            } else {
                // offset = 0 to reload basic pokemons tab.
                this.pokemonService.getPokemons(this.limit).subscribe(myResult => {
                        this.data = myResult.data;
                    }
                );
            }
        });
    }

    onScroll(): void {
        if (this.limit < this.limitMax) {
            this.pokemonService.getPokemons(this.limit += 20).subscribe(myResult => {
                this.data = [...myResult.data];
            });
        }
    }

    getPokemonDetails(pokemon: Pokemon): void {
        this.getPokemonDetailsEmitter.emit(pokemon);
    }

    searchPokemon(event: any): void {
        // if (event != '' && event != undefined) {
        //     this.pokemonService.getPokemonsBySearch(event).subscribe(myResult => {
        //         this.data = myResult.data;
        //     });
        // } else {
        //     this.pokemonService.getPokemons(this.limit).subscribe(myResult => {
        //         this.data = myResult.data;
        //     });
        // }
    }
}
