import { HomeService } from './home.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('searchbar') searchbar: ElementRef;
  searchTerm: string;

  public feed: string;
  public items = [];

  constructor(private homeService: HomeService, public activatedroute: ActivatedRoute, private appservice: AppService) { }

  ngOnInit(): void {
    this.activatedroute.data.subscribe((link) => {
      this.feed = link.feed;
      this.homeService.getData(this.feed).subscribe(item => this.items = item);
    });
  }

  search() {
    console.log(this.searchTerm);
    this.appservice.getDataFromSearchBar(this.searchTerm).toPromise().then(data=> console.log(data));
  }

  ngAfterViewInit() {

  }
}
