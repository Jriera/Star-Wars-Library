import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Starship, StarshipComplements } from '../models/starship.model';
import { APIResponse } from '../models/api-response.model';
import { Character } from '../models/character.model';
import { Film} from '../models/films.model';


@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getStarships(page?:string): Observable<APIResponse<Starship>> {
    if(page){
      let params = new HttpParams().set('page' ,page);
      const starshipResponse = this.http.get<APIResponse<Starship>>('https://swapi.py4e.com/api/starships/',{params:params});
      return starshipResponse;
    }
    const starshipResponse = this.http.get<APIResponse<Starship>>(
'https://swapi.py4e.com/api/starships/'
    );
    return starshipResponse;
  }

  getStarshipDetails(id: string): Observable<Starship> {
    const starship = this.http.get<Starship>(
      `https://swapi.py4e.com/api/starships/${id}`
    );
    return starship;
  }

  getStarshipComplements(id: string):Observable<StarshipComplements>{
    const extraDetails = this.http.get<StarshipComplements>(
      `https://complement-swapi.herokuapp.com/starships/${id}/`
    );
    return extraDetails;
  }

  getCharacter(id: string): Observable<Character> {
  const character = this.http.get<Character>(
    `https://swapi.py4e.com/api/people/${id}`
  );
  return character;
  }

  getFilms(id: string): Observable<Film> {
    const film = this.http.get<Film>(
      `https://swapi.py4e.com/api/films/${id}`
    );
    return film;
  }
}
