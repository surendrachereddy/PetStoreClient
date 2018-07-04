import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import {IPet} from './pet';
@Injectable()
export class PetService{

  private _getPets = 'http://localhost:8085/pets';
  private _getPet = 'http://localhost:8085/pet/';
  private _addPet = 'http://localhost:8085/pet';
  private _deletePet = 'http://localhost:8085/pet/';

  constructor(private _http: Http){
  }

  getPets(): Observable<IPet[]>{
      return this._http.get(this._getPets)
      .map((response: Response) => <IPet[]> response.json())
      .do( data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
    }

  getPet(id: number):Observable<IPet>{
    return this._http.get(this._getPet + id)
    .map((response: Response) => <IPet> response.json())
    .do( data => console.log('All: ' + JSON.stringify(data)))
    .catch(this.handleError);
  }

  savePet(pet: IPet): Observable<IPet> {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });


          return this.createPet(pet, options);
  }

  deletePet(id: number): Observable<Response>{
    return this._http.delete(this._deletePet + id)
    .map(this.extractData)
    .do(data => console.log('deletePet: ' + JSON.stringify(data)))
    .catch(this.handleError);
  }

  private createPet(pet: IPet, options: RequestOptions): Observable<IPet> {
      pet.id = undefined;
      return this._http.post(this._addPet, pet, options)
          .map(this.extractData)
          .do(data => console.log('createPet: ' + JSON.stringify(data)))
          .catch(this.handleError);
}

  private handleError(error: Response){
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
  }

  private extractData(response: Response) {
       let body = response.json();
       return body || {};
}

}
