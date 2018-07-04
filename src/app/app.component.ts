import { Component } from '@angular/core';

import {PetService} from './pets/pet.service';
import {CategoryService} from './pets/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PetService, CategoryService]
})
export class AppComponent {
  title = 'Pet Store';
}
