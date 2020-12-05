import { HomeService } from './home.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('searchbar') searchbar: ElementRef;
  searchTerm: string;

  public feed: string;
  public items = [];

  constructor(
    private homeService: HomeService,
    public activatedroute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedroute.data.subscribe((link) => {
      this.feed = link.feed;
      this.homeService.getData(this.feed).subscribe(item => this.items = item);
    });
  }

  search() {
    this.router.navigateByUrl('/αναζητηση?searchTerm=' + this.searchTerm);
  }

  ngAfterViewInit() {

  }
}
