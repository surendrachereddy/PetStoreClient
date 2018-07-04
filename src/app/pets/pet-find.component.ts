import {Component, OnInit} from "@angular/core";

import {IPet} from './pet';
import {PetService} from './pet.service';

@Component({
  moduleId: module.id,
  templateUrl: "pet-find.component.html",
  styleUrls: ['pet-find.component.css']
})
export class PetFindComponent{
  pet: IPet;
  searchId: number;
  message: string;
  searched: boolean = false;

  constructor(private _petService: PetService){
  }

  findPet(): void{
    this.pet = null;
    this.searched = true;
    this._petService.getPet(this.searchId).
    subscribe(pet => this.pet = pet,
            error => this.message = <any>error);
  }
}
