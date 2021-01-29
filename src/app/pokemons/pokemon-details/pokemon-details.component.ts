import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges
} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {PokemonDetails} from "../models/pokemon-details.model";
import {PokemonService} from "../services/pokemon.service";

@Component({
    selector: 'app-pokemon-details',
    templateUrl: './pokemon-details.component.html',
    styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit, OnChanges {

    @Input() pokemon?: PokemonDetails;
    isTTSAvailable: boolean;
    textToSpeech?: SpeechSynthesisUtterance;

    constructor(
        private route: ActivatedRoute,
        private pokemonService: PokemonService,
        private location: Location
    ) {
    }

    ngOnInit(): void {
        this.getPokemon();
        if ('speechSynthesis' in window) {
            this.isTTSAvailable = true;
            this.textToSpeech = new SpeechSynthesisUtterance();
        } else {
            this.isTTSAvailable = false;
            console.log('Text-to-speech not supported.');
        }
    }

    getPokemon(): void {
        const id = +this.route.snapshot.paramMap!.get('id');
        if (id != null) {
            this.pokemonService.getPokemonInfoById(id).subscribe(myResult => this.pokemon = myResult);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.pokemon.currentValue) {
            if (changes.pokemon.currentValue != changes.pokemon.previousValue) {
                this.pokemonService.getPokemonInfoById(changes.pokemon.currentValue.id).subscribe(myResult => {
                    this.pokemon = myResult;
                    this.textToSpeech.text = this.pokemon.description;
                    if (this.isTTSAvailable) {
                        window.speechSynthesis.cancel();
                        setTimeout(() => window.speechSynthesis.speak(this.textToSpeech), 2000);
                    }
                });
            }
        }
    }

    // goBack(): void {
    //     this.location.back();
    // }
}