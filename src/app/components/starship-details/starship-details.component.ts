import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Starship } from 'src/app/models/starship.model';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-starship-details',
  templateUrl: './starship-details.component.html',
  styleUrls: ['./starship-details.component.scss']
})
export class StarshipDetailsComponent implements OnInit {
  starship:Starship ={
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
 
  starshipSub:Subscription = new Subscription();
  routeSub:Subscription=new Subscription();
  extraDetail:Subscription=new Subscription();
  descrriptionSub:Subscription = new Subscription();
  description:string = "";
  default:string=''

  constructor(private activatedRoute:ActivatedRoute,private http:HttpService) { }

  ngOnInit(): void {
    
    this.getStarship();
    this.getStarshipComplements(this.starship.id);
    this.getDescription(this.starship.id);
    
  }

  getStarship(){
    this.routeSub = this.activatedRoute.params.subscribe(params => {
      this.starship.id = params.id;
      this.getStarshipDetails(params.id);
  })
}
getStarshipDetails(id:string){
    this.starshipSub = this.http.getStarshipDetails(id).subscribe(resp => {
      this.getDescription(id);
      this.starship ={
        ...resp,
        url:`https://starwars-visualguide.com/assets/img/starships/${id}.jpg`,
      }
})
}

getStarshipComplements(id:string){
  try {
    this.extraDetail = this.http.getStarshipComplements(id).subscribe((res)=>{
      this.default = res.image;
      this.starship.url = this.default;
      
    })
  } catch (error) {
    console.log(error);
  }
  
  
}

getDescription(id:string){
  this.descrriptionSub=this.http.getStarshipComplements(id).subscribe((res)=>{
    this.description = res.description;
  })
  

}


}
