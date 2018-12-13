import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  selected: any;
  constructor(private _http: HttpClient) { }

  newAuthor(newAuthor){
    console.log("inside service.ts");
    return this._http.post('/new', newAuthor);
  }

  getAuthors(){

    return this._http.get('/authors');
  }

  deleteService(id){
    return this._http.delete(/authors/+id);
  }

  editAuthor(author){
    console.log("in service.ts");
    console.log(author);
    return this._http.put('/edit', author);
  }

}
