import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { Starship } from 'src/app/models/starship.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-pilots',
  templateUrl: './pilots.component.html',
  styleUrls: ['./pilots.component.scss']
})
export class PilotsComponent implements OnInit, OnChanges {
  @Input() starship:Starship =
    {
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
  pilotsUrls=this.starship.pilots
  pilots:Character[]=[];
  constructor(private http:HttpService) { }

  ngOnInit(): void {
    
  }
  ngOnChanges(){
    this.pilotsUrls=this.starship.pilots
    this.getPilots();
  }

  getId(url: string) {
    //no existeix id unica per cada pilot, per tant, hem de obtenir la id a partir de la propietat url del pilot
    switch (url.length) {
      case 31:
        const id = url.slice(url.indexOf('[0-9]') - 2,url.indexOf('[0-9]')
        );
        return id;

      case 30:
        const id2 = url.slice(url.indexOf('[0-9]') - 1,url.indexOf('[0-9]')
        );

        return id2;

      default:
        const defId = url.slice(url.indexOf('[0-9]') - 1,url.indexOf('[0-9]')
        );
        return defId;
    }
  }

  getPilots() {
     this.pilotsUrls
      .map(pilotUrl => this.getId(pilotUrl))
      .forEach(pilotId => {
         this.http.getCharacter(pilotId).subscribe(pilot => {
           pilot.id = pilotId;
           pilot.image=`https://starwars-visualguide.com/assets/img/characters/${pilotId}.jpg`
            this.pilots.push(pilot);
          }
        );
      });
  }
}
