import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {ApiResponse} from "../models/apiResponse.model";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  apiUrl = 'http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io'

  constructor(
      private http: HttpClient
  ) { }

  getPokemons(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl + '/pokemons');
  }

  getPokemonInfoById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl + '/pokemons/' + id);
  }
}
