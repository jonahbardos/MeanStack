import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  author: any;
  error: string;
  editAuthor: any;
  data: any;
  constructor(private _httpService: HttpService,
              private _route: ActivatedRoute,
              private _router: Router) { }

  ngOnInit() {
    this.author = this._httpService.selected;
  }

  onEdit() {
      console.log("submitbutton");
      const observable = this._httpService.editAuthor(this.author);
      observable.subscribe(data => {
        if(data.message === "Success"){this._router.navigate(['']);}
        else{
          this.error = "Cant be Empty"
        }

      });
  }

}
