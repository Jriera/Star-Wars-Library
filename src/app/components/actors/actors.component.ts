import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Character } from 'src/app/models/character.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.scss']
})
export class ActorsComponent implements OnInit {
charactersSub:Subscription=new Subscription();
characters:Character[]=[]
page:number=1;
  character: Character={
    image:"",
    id: '1',
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    hair_color: "blond",
    skin_color: "fair",
    eye_color: "blue",
    birth_year: "19BBY",
    gender: "male",
    homeworld: "https://swapi.dev/api/planets/1/",
    films: [
        "https://swapi.dev/api/films/1/",
        "https://swapi.dev/api/films/2/",
        "https://swapi.dev/api/films/3/",
        "https://swapi.dev/api/films/6/"
    ],
    species: [],
    vehicles: [
        "https://swapi.dev/api/vehicles/14/",
        "https://swapi.dev/api/vehicles/30/"
    ],
    starships: [
        "https://swapi.dev/api/starships/12/",
        "https://swapi.dev/api/starships/22/"
    ],
    url: "https://swapi.dev/api/people/1/",
    
    
  }
  constructor(private http:HttpService) { }

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters(){
    this.charactersSub=this.http.getCharacters().subscribe(res=>{
      this.characters=res.results;
      this.characters.forEach(character=>{
        character.id=this.getId(character.url);
        character.image=`https://starwars-visualguide.com/assets/img/characters/${character.id}.jpg`;
      })
      console.log(res);
    });
  }

  getCharacter(id:string){
    this.http.getCharacter(id).subscribe(res=>{
      this.character=res
      console.log(this.character);
    })
  }
    
  
onScroll(){
    this.page++;
    const pageParam = this.page.toString();

    //es fa una nova subscripcio a l'observable amb el nou parametre de la pagina, i
    //s'afegeixen els resultats a la nostra array de actors inicial mitjatçant el concat
    this.charactersSub = this.http.getCharacters(pageParam).subscribe((res) => {
      res.results.forEach(character => {
        character.id = this.getId(character.url);
        character.image = `https://starwars-visualguide.com/assets/img/characters/${character.id}.jpg`;
        console.log(character.id);
      })
      this.characters = this.characters.concat(res.results);
    });
  }
      
  getId(url: string) {
    //no existeix id unica per cada actor, per tant, hem de obtenir la id a partir de la propietat url del actor
    switch (url.length) {
      case 32:
        const id = url.slice(url.indexOf('[0-9]') - 2,url.indexOf('[0-9]')
        );
        return id;

      case 31:
        const id2 = url.slice(url.indexOf('[0-9]') - 1,url.indexOf('[0-9]')
        );

        return id2;

      default:
        const defId = url.slice(url.indexOf('[0-9]') - 1,url.indexOf('[0-9]')
        );
        return defId;
    }
  }
  

  characterDetail(character:Character){
    const id=this.getId(character.url);
    this.getCharacter(id);
  }
    
}
