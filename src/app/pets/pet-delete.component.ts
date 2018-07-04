import {Component, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';


import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import {PetService} from './pet.service';


@Component({
    moduleId: module.id,
    selector: 'pet-delete',
    templateUrl: 'pet-delete.component.html',
})
export class PetDeleteComponent{
  @Input() id: number;
  errorMessage: string;
  data: any;
  constructor(private _petService: PetService, private _router: Router){

  }

  deletePet() :void {
    if(confirm('Do you want to delete this pet?')){
      this._petService.deletePet(this.id)
      .subscribe(
        data => this.data = data,
         (error: any) => this.errorMessage = <any>error,
         () => this.onDeletion()
      );
    }
  }

  onDeletion() :void {
    this._router.navigate(['/PetList']);
    console.log(this.data);
  }
}
