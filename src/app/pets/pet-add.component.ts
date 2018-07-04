import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import {IPet} from './pet';
import {ICategory} from './category';
import {PetService} from './pet.service';
import {CategoryService} from './category.service';

import {GenericValidator} from './generic-validator';

@Component({
  moduleId: module.id,
  templateUrl: "pet-add.component.html",
  styleUrls: ['pet-add.component.css']
})
export class PetAddComponent implements OnInit, AfterViewInit, OnDestroy{
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  message: string;
  petForm: FormGroup;

  pet: IPet;
  categories: ICategory[];

  submitted: boolean = false;

  get photoUrls(): FormArray{
    return <FormArray> this.petForm.get('photoUrls');
  }

  get tags(): FormArray{
    return <FormArray> this.petForm.get('tags');
  }

  constructor(private _fb: FormBuilder, private _petService: PetService, private _categoryService: CategoryService){
  }

  ngOnInit(): void{
    this.petForm = this._fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      photoUrls: this._fb.array([]),
      status: ['', Validators.required],
      tags: this._fb.array([this.initTags()])
    })

    this._categoryService.getCategories().
    subscribe(category => this.categories = category,
            error => this.message = <any>error);
    this.addPhoto();
  }

  initTags(){
    return this._fb.group({
      name: ['', Validators.required]
    });
  }

  initPhotos(){
    return this._fb.group({
      photoUrls: ['', [Validators.required, Validators.pattern]]
    })
  }

  ngOnDestroy(): void {

  }

  ngAfterViewInit(): void {
  }

  addPhoto(): void{
    this.photoUrls.push(new FormControl('', Validators.compose( [Validators.required, Validators.pattern(/\.(gif|jpg|jpeg|tiff|png)$/i)])));
  }
  removePhoto(i: number):void{
    this.photoUrls.removeAt(i);
  }

  addTag(): void{
    this.tags.push(this.initTags());
  }

  removeTag(i: number): void{
    this.tags.removeAt(i);
  }

  savePet(): void{

    console.log(this.petForm);

 if (this.petForm.dirty && this.petForm.valid){
    let p = Object.assign({}, this.pet, this.petForm.value);

    this._petService.savePet(p)
    .subscribe(
      () => this.onSaveComplete(),
      (error: any) => this.message = <any> error
    );

  }
  else{
    this.submitted = true;
  }
  }

  onSaveComplete(): void {
       // Reset the form to clear the flags
       this.petForm.reset();
       this.submitted = false;
       alert('Pet has been saved.')
       //this.router.navigate(['/PetList']);
}

}
