import { AppService } from './../../app.service';
import { CategoriesService } from './categories.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { Location } from '@angular/common';




@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public home: MenuItem;
  public items: MenuItem[] = [];
  public feed: string;
  public categoriesFound = [];
  public categoriesFromFeed = [];
  public searchTerm;
  public loading = true;

  private genders = [];
  private genderLevel = false;
  private mainCategories = [];
  private mainCategoryLevel = false;
  private categories = [];
  private categoryLevel = false;
  private productsFound = [];
  private backButtonPressed = false;

  constructor(
    private categoriesService: CategoriesService,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private appService: AppService
  ) {
    if (localStorage.getItem('backButtonPressed') && JSON.parse(localStorage.getItem('backButtonPressed')) === true) {
      this.backButtonPressed = true;
      localStorage.setItem('backButtonPressed', 'false');
    }
    this.searchTerm = this.activatedroute.snapshot.queryParams.searchTerm;
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  async ngOnInit(): Promise<void> {
    console.log('init');
    this.home = { icon: 'pi pi-home', url: 'αρχικη' };
    // If the user is coming from the search bar
    if (this.searchTerm && this.searchTerm !== '') {
      this.feed = '/assets/data/search-bar-feed.json';
      await this.appService.getDataFromSearchBar(this.searchTerm)
        .then(data => {
          this.productsFound = data.productsFound,
            this.genders = data.genders, this.mainCategories = data.mainCategories, this.categories = data.categories;
        });
      await this.categoriesService.getData(this.feed).then(feed => feed.forEach(item => this.categoriesFromFeed.push(item)));
      if (this.genders.length > 1) {
        this.genderLevel = false;
        this.categoriesFound = this.categoriesFromFeed
          .filter(categoryFromFeed => this.genders.some((gender) => categoryFromFeed.gender === gender
            && !categoryFromFeed.mainCategory));
      } else if (this.mainCategories.length > 1 && this.genders.length === 1) {
        this.mainCategoryLevel = true;
        this.categoriesFound = this.categoriesFromFeed
          .filter(categoryFromFeed =>
            this.mainCategories
              .some(mainCategory => categoryFromFeed.mainCategory === mainCategory
                && this.genders[0] === categoryFromFeed.gender && !categoryFromFeed.category));
        this.items.push({ label: this.categoriesFound[0].genderLabel, url: '/' + this.categoriesFound[0].gender });
      } else if (this.categories.length > 1 && this.mainCategories.length === 1 && this.genders.length === 1) {
        this.categoriesFound = this.categoriesFromFeed
          .filter(categoryFromFeed =>
            this.categories
              .some(category => categoryFromFeed.category === category &&
                this.mainCategories[0] === categoryFromFeed.mainCategory && this.genders[0] === categoryFromFeed.gender));
        this.items.push({ label: this.categoriesFound[0].genderLabel, url: '/' + this.categoriesFound[0].gender });
        // tslint:disable-next-line: max-line-length
        this.items.push({ label: this.categoriesFound[0].mainCategoryLabel, url: '/' + this.categoriesFound[0].mainCategory + '/' + this.categoriesFound[0].mainCategory });
      } else if (this.productsFound.length) {
        if (!this.backButtonPressed) {
          this.categoryLevel = true;
          console.log('/' + this.genders[0] + '/' + this.mainCategories[0] + '/' + this.categories[0]);
          this.router.navigateByUrl('/' + this.genders[0] + '/' + this.mainCategories[0] + '/' + this.categories[0]
            + '?searchTerm=' + this.searchTerm);
        } else {
          this.location.back();
        }

      }
      this.loading = false;
    } else {
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
        this.categoriesService.getData(this.feed).then(feed => feed.forEach(item => this.categoriesFound.push(item)));
      });
      this.loading = false;
    }

  }

  onSelection(category) {
    if (this.searchTerm) {
      if (this.genderLevel) {
        this.router.navigateByUrl(category.url + '?searchTerm=' + this.searchTerm + ' ' + category.gender);
      } else if (this.mainCategoryLevel) {
        this.router.navigateByUrl(category.url + '?searchTerm=' + this.searchTerm + ' ' + category.mainCategory);
      } else if (this.categoryLevel) {
        this.router.navigateByUrl(category.url + '?searchTerm=' + this.searchTerm + ' ' + category.category);
      } else {
        this.router.navigateByUrl(category.url + '?searchTerm=' + this.searchTerm);
      }
    } else {
      this.router.navigateByUrl(category.url);
    }

  }
  imageError(cataegoryDiv) {
    document.getElementById(cataegoryDiv).remove();
  }
}
