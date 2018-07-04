import{Component, OnInit} from '@angular/core';

import {IPet} from './pet';
import {PetService} from './pet.service';

@Component({
    selector: 'pet-list',
    moduleId: module.id,
    templateUrl: 'pet-list.component.html',
    styleUrls: ['pet-list.component.css']
})
export class PetListComponent implements OnInit{
  pageTitle:string = 'Pet List';
  imageWidth: number = 350;
  imageHeight: number = 200;
  imageMargin: number = 2;
  pets: IPet[];
  pet: IPet;
  message: string;

  constructor(private _petService: PetService){}

  ngOnInit(): void{
    this._petService.getPets()
    .subscribe(pets => this.pets = pets,
      error => this.message = <any>error);

    this._petService.getPet(1).
    subscribe(pet => this.pet = pet,
            error => this.message = <any>error);

  
  }


}
