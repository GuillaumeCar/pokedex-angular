import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
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

    getPokemons(limit?: number, offset?: number, search?: string): Observable<ApiResponse> {
        let params = new HttpParams();
        if (limit) {
            params = params.set('limit', `${limit}`);
        }
        if (offset) {
            params = params.set('offset', `${offset}`);
        }
        if (search) {
            params = params.set('search', `${search}`);
        }

        return this.http.get<ApiResponse>(environment.pokemonsUrl, {params});

        // if (limit && offset) {
        //   return this.http.get<ApiResponse>(environment.apiUrl + '/pokemons?limit=' + limit + '&offset=' + offset);
        // } else if (limit) {
        //   return this.http.get<ApiResponse>(environment.apiUrl+ '/pokemons?limit=' + limit);
        // }
        // return this.http.get<ApiResponse>(environment.apiUrl + '/pokemons');
    }

    getPokemonInfoById(id: number): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(environment.pokemonsUrl + '/' + id);
    }

    // getPokemonsBySearch(search: string): Observable<ApiResponse> {
    //     return this.http.get<ApiResponse>(environment.apiUrl + '/pokemons?search=' + search);
    // }
}
