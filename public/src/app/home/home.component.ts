import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _httpService: HttpService,
              private _route: ActivatedRoute,
              private _router: Router) { }

  authors = [];
  ngOnInit() {
    this.getAuthorsFromService();
  }

  getAuthorsFromService(){
    let observable = this._httpService.getAuthors();
    observable.subscribe(data => {
      console.log("got our tasks", data);

      this.authors = data['author'];
      console.log(data['author']);
    });
  }

  deleteAuthor(id){
    const observable = this._httpService.deleteService(id);
    observable.subscribe(data => {
      console.log('got data', data);
      this.getAuthorsFromService();
    });
  }

  authorPage(author){
    console.log(author);
    this._httpService.selected = author;
    this._router.navigate(['edit'])
  }



}
