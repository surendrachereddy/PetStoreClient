import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PetListComponent } from './pets/pet-list.component';
import { PetDetailComponent} from './pets/pet-detail.component';
import { PetFindComponent} from './pets/pet-find.component';
import { PetAddComponent} from './pets/pet-add.component';
import { PetDeleteComponent} from './pets/pet-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    PetListComponent,
    PetDetailComponent,
    PetFindComponent,
    PetAddComponent,
    PetDeleteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(
      [
        {path: 'PetList', component: PetListComponent},
        {path: 'PetDetail/:id', component: PetDetailComponent},
        {path: 'PetFind', component: PetFindComponent},
        {path: 'PetAdd', component: PetAddComponent},
        {path: '', redirectTo: '/PetList', pathMatch: 'full'},
        {path: '**', redirectTo: '/PetList', pathMatch: 'full'}], { useHash: true }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
