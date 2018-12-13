import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  newAuthor: any;
  error: string;

  constructor(private _httpService: HttpService,
              private _route: ActivatedRoute,
              private _router: Router) {
  }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log(params['id'])
    });
    this.newAuthor = {name: ""};

  }

  // onSubmit(){
  //   console.log("onsubmit");
  //   const observable = this._httpService.addAuthor(this.name);
  //   observable.subscribe(data => {
  //   if ((data as any).message === 'Success') {
  //     this._router.navigate(['/']);
  //   } else {
  //     this.error = 'Name must be at least 3 characters';
  //   }
  // });
  // console.log(this.name);
  // }

  submitButton() {
    console.log("submitbutton");
    console.log(this.newAuthor);
    const observable = this._httpService.newAuthor(this.newAuthor);
    observable.subscribe(data => {
      if ((data as any).message === 'Success') {
              this._router.navigate(['add']);
            } else {
              this.error = 'Name must be at least 3 characters';
            }
          });
  }
}
  //     if ((data as any).message === 'Success') {
  //       this._router.navigate(['/']);
  //     } else {
  //       this.error = 'Name must be at least 3 characters';
  //     }
  //   });
  //   console.log(this.name);
  // }

