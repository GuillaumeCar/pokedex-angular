import {Component, Input, OnInit} from '@angular/core';
import {PokemonService} from "../services/pokemon.service";
import {ActivatedRoute} from "@angular/router";
import {PokemonDetails} from "../models/pokemon-details.model";
import {Location} from "@angular/common";

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {

  @Input() pokemon?: PokemonDetails;

  constructor(
      private route: ActivatedRoute,
      private pokemonService: PokemonService,
      private location: Location
  ) { }

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon(): void {
      const id = +this.route.snapshot.paramMap!.get('id');
      if (id != null)
          this.pokemonService.getPokemonInfoById(id).subscribe(myResult => this.pokemon = myResult);
  }

  goBack(): void {
      this.location.back();
  }
}
