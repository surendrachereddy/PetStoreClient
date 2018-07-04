import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from '@angular/router'

import {IPet} from './pet';
import {PetService} from './pet.service';

@Component({
  selector: "pet-detail",
  moduleId: module.id,
  templateUrl: "pet-detail.component.html",
  styleUrls: ['pet-detail.component.css']
})
export class PetDetailComponent implements OnInit{

  pet: IPet;
  message: string;

  constructor(private _route: ActivatedRoute, private _router: Router,
    private _petService: PetService){
  }

  ngOnInit(): void{
    let id = +this._route.snapshot.params['id'];

    this._petService.getPet(id).
    subscribe(pet => this.pet = pet,
            error => this.message = <any>error);
  }

  onBack() : void{
    this._router.navigate(['/PetList']);
  }
}
