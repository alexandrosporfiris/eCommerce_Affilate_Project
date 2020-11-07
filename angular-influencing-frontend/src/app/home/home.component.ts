import { HomeService } from './home.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('searchbar') searchbar: ElementRef;

  public feed: string;
  public items = [];

  constructor(private homeService: HomeService, public activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedroute.data.subscribe((link) => {
      this.feed = link.feed;
      this.homeService.getData(this.feed).subscribe(item => this.items = item);
    });
  }

  ngAfterViewInit() {
    // TODO: This logic will be revised (only for development and visual purpose)
    this.searchbar.nativeElement.style.backgroundImage = 'url(/assets/images/gynaikeia/arxikh/search.webp)';
  }
}
