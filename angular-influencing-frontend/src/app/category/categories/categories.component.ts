import { CategoriesService } from './categories.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';



@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public home: MenuItem;
  public items: MenuItem[] = [];
  public feed: string;
  public categories = [];

  constructor(private categoriesService: CategoriesService, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.home = { icon: 'pi pi-home', url: 'αρχικη' };
    this.activatedroute.data.subscribe(gender => {
      this.items.push({ label: gender.label, url: gender.url });
      if (this.activatedroute.children[0]) {
        this.activatedroute.children[0].data.subscribe(category => {
          this.items.push({ label: category.label, url: category.url }),
            this.feed = category.feed;
        });
      } else {
        this.feed = gender.feed;
      }
      this.categoriesService.getData(this.feed).subscribe(feed => feed.forEach(item => this.categories.push(item)));
    });
  }

}
