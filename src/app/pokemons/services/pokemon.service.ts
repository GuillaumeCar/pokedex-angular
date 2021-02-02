import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {ApiResponse} from "../models/apiResponse.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
      private http: HttpClient
  ) { }

  getPokemons(limit?: number, offset?: number): Observable<ApiResponse> {
    if (limit && offset) {
      return this.http.get<ApiResponse>(environment.apiUrl + '/pokemons?limit=' + limit + '&offset=' + offset);
    } else if (limit) {
      return this.http.get<ApiResponse>(environment.apiUrl+ '/pokemons?limit=' + limit);
    }
    return this.http.get<ApiResponse>(environment.apiUrl + '/pokemons');
  }

  getPokemonInfoById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(environment.apiUrl + '/pokemons/' + id);
  }

  getPokemonsBySearch(search: string): Observable<ApiResponse> {
      return this.http.get<ApiResponse>(environment.apiUrl + '/pokemons?search=' + search);
  }
}
