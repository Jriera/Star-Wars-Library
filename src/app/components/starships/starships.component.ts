import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Starship } from 'src/app/models/starship.model';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.scss'],
})


export class StarshipsComponent implements OnInit {
  starshipSub: Subscription = new Subscription();
  extraDetail:Subscription = new Subscription();
  imageURL: string = '';
  page: number = 1;
  starships: Starship[] = [];
  constructor(private http: HttpService, private router: Router) {}

  ngOnInit(): void {
    this.getStarships();
  }

  addStarshipId() {
    this.starships.forEach((s) => {
      s.id = this.getStarshipId(s);
    });
  }

  getStarships() {
    this.starshipSub = this.http.getStarships().subscribe((res) => {
      this.starships = res.results;
      this.starships.forEach((s) => {
        s.id = this.getStarshipId(s);//associem la id a cada nau en la generacio de la array
        s.url= `https://starwars-visualguide.com/assets/img/starships/${s.id}.jpg`//substituim la url per la imatge
      });
    });
  }

  getStarshipId(starship: Starship) {
    //no existeix id unica per cada nau, per tant, hem de passar el id de la nau per la url
    switch (starship.url.length) {
      case 40:
        starship.id = starship.url.slice(
          starship.url.indexOf('[0-9]') - 2,
          starship.url.indexOf('[0-9]')
        );
        return starship.id;

      case 39:
        starship.id = starship.url.slice(
          starship.url.indexOf('[0-9]') - 1,
          starship.url.indexOf('[0-9]')
        );

        return starship.id;

      default:
        starship.id = starship.url.slice(
          starship.url.indexOf('[0-9]') - 1,
          starship.url.indexOf('[0-9]')
        );
        return starship.id;
    }
  }

  starshipDetail(starship: Starship) {
    this.router.navigate(['/starship', starship.id]);
  }

  onScroll() {
    //funcio a cridar per infinite scroll
    this.page++;
    const pageParam = this.page.toString();

    //es fa una nova subscripcio a l'observable amb el nou parametre de la pagina, i
    //s'afegeixen els resultats a la nostra array de naus inicial mitjatçant el concat
    this.starshipSub = this.http.getStarships(pageParam).subscribe((res) => {
      res.results.forEach((s) => {
        s.id = this.getStarshipId(s);
        s.url= `https://starwars-visualguide.com/assets/img/starships/${s.id}.jpg`
      })
      this.starships = this.starships.concat(res.results);
      
    });
  }

  ngOnDestroy(): void {
    this.starshipSub.unsubscribe();
  }

    getStarshipComplements(starship:Starship){
      this.extraDetail = this.http.getStarshipComplements(starship.id).subscribe((res)=>{
        starship.url = res.image;
        
      })
      
    }

    
}
