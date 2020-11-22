import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchTerm: string;

  constructor(private appservice: AppService) { }

  ngOnInit() {
  }

  search() {
    console.log(this.searchTerm);
    this.appservice.getDataFromSearchBar(this.searchTerm).toPromise().then(data=> console.log(data));
  }

}
