import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Film } from 'src/app/models/films.model';
import { Starship } from 'src/app/models/starship.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit, OnChanges {
@Input() starship:Starship={
  name: 'Starship',
      model: 'Starship',
      manufacturer: 'Starship',
      cost_in_credits: 'Starship',
      length: 'Starship',
      max_atmosphering_speed: 'Starship',
      crew: 'Starship',
      passengers: 'Starship',
      cargo_capacity: 'Starship',
      consumables: 'Starship',
      hyperdrive_rating: 'Starship',
      MGLT: 'Starship',
      starship_class: 'Starship',
      pilots: [],
      films: [],
      created: 'Starship',
      edited: 'Starship',
      url: 'Starship',
      id: 'Starship'
}

  filmsUrls=this.starship.films
  films:Film[]=[];
  constructor(private http:HttpService) { }

  ngOnInit(): void {
  }

  ngOnChanges(){
    this.filmsUrls=this.starship.films
    this.getFilms();
    
  }

  getId(url: string) {
    //no existeix id unica per cada pelicula, per tant, hem de obtenir la id a partir de la propietat url del film
    switch (url.length) {
      case 30:
        const id = url.slice(url.indexOf('[0-9]') - 2,url.indexOf('[0-9]')
        );
        return id;

      case 29:
        const id2 = url.slice(url.indexOf('[0-9]') - 1,url.indexOf('[0-9]')
        );

        return id2;

      default:
        const defId = url.slice(url.indexOf('[0-9]') - 1,url.indexOf('[0-9]')
        );
        return defId;
    }
  }

  getFilms() {
    this.filmsUrls
     .map(filmUrl => this.getId(filmUrl))
     .forEach(filmId => {
        this.http.getFilms(filmId).subscribe(film => {
          film.id = filmId;
          film.image=`https://starwars-visualguide.com/assets/img/films/${filmId}.jpg`
           this.films.push(film);
         }
       );
     });
 }

}
