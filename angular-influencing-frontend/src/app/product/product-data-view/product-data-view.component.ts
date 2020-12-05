import { environment } from './../../../environments/environment.prod';
import { ProductDetailsComponent } from './../product-details/product-details.component';
import { AfterViewInit, Component, HostListener, OnInit, ViewChildren } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { Product } from '../../../assets/intefaces/product';
import { DialogService } from 'primeng/dynamicdialog';
import { AppService } from '../../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { QueryList } from '@angular/core';

@Component({
  selector: 'app-product-data-view',
  templateUrl: './product-data-view.component.html',
  styleUrls: ['./product-data-view.component.scss'],
  providers: [DialogService],
})
export class ProductDataViewComponent implements OnInit, AfterViewInit {

  @ViewChildren(NgbCarousel) carousels: QueryList<NgbCarousel>;

  public home: MenuItem;

  public items: MenuItem[] = [];

  public loading = true;

  public publicImages = environment.BACKEND_PUBLIC_IMAGES;

  products: Product[];

  catgories: SelectItem[] = [];

  searchTerm: string;

  sizes: any[] = [];

  colours: any[] = [];

  sorted: any[] = [];

  brands: any[] = [];

  selectedBrands: any[] = [];

  selectedCategories: any;

  selectedColours: any[] = [];

  selectedProduct: Product;

  sortOptions: SelectItem[];

  sortKey: string;

  sortField: string;

  sortOrder: number;

  link: string;

  params: any;

  totalRecords: any;

  page = 0;

  position: number;

  constructor(
    private appservice: AppService,
    public dialogService: DialogService,
    public activatedroute: ActivatedRoute,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.home = { icon: 'pi pi-home', url: 'αρχικη' };
    this.getLinkPamrams();
    this.appservice
      .getData(this.link, this.params)
      .toPromise()
      .then((data) => {
        (this.totalRecords = data.total), (this.products = data.products),
          (data.colours.forEach(colour => this.colours.push({ label: colour, value: colour })));
        (data.brands.forEach(colour => this.brands.push({ label: colour, value: colour })));
        // Pagination position initialization
        (this.position = this.activatedroute.snapshot.queryParams.page ? this.activatedroute.snapshot.queryParams.page * 20 : 0);
        this.loading = false;
      });
  }

  getLinkPamrams() {
    this.activatedroute.data.subscribe((link) => {
      this.link = link.url;
      this.items = link.items;
      this.params = this.activatedroute.snapshot.queryParams;
      if (typeof this.activatedroute.snapshot.queryParams.brand_name === 'string'
      ) {
        this.selectedBrands = [this.activatedroute.snapshot.queryParams.brand_name];
      } else {
        this.selectedBrands = this.activatedroute.snapshot.queryParams.brand_name;
      }
      if (typeof this.activatedroute.snapshot.queryParams.colour === 'string'
      ) {
        this.selectedColours = [this.activatedroute.snapshot.queryParams.colour];
      } else {
        this.selectedColours = this.activatedroute.snapshot.queryParams.colour;
      }
      if (this.activatedroute.snapshot.queryParams.searchTerm) {
        this.searchTerm = this.activatedroute.snapshot.queryParams.searchTerm;
      }

    });

  }

  showProduct(selectedProduct: any) {
    this.selectedProduct = selectedProduct;
    this.dialogService.open(ProductDetailsComponent, {
      data: {
        selectedProduct: this.selectedProduct,
      },
      header: this.selectedProduct.product_name,
    });
  }

  onSortChange(event: { value: any }) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  onFilterSelection() {
    console.log(this.selectedBrands);
    this.router.navigate([this.link], {
      queryParams: {
        colour: this.selectedColours,
        brand_name: this.selectedBrands,
        page: this.page,
        searchTerm: this.searchTerm,
      },
    });
  }

  onPagenation(event) {
    this.page = event.first / event.rows;
    this.router.navigate([this.link], {
      queryParams: {
        colour: this.selectedColours,
        brand_name: this.selectedBrands,
        page: this.page,
        searchTerm: this.searchTerm,
      },
    });
  }

  onfiltersButton(sidebar) {
    sidebar.style.marginLeft = 0;
  }

  clearSelectedBrands() {
    this.selectedBrands = [];
  }

  clearSelectedColours() {
    this.selectedColours = [];
  }

  @HostListener('window:popstate', ['$event'])
  onPopState() {
    localStorage.setItem('backButtonPressed', 'true');
  }

  ngAfterViewInit() {
    this.carousels.changes
      .subscribe((carouselComps: QueryList<NgbCarousel>) => carouselComps.forEach(carouselComp => carouselComp.pause()));
  }

  // This logic moved to backend
  //       (this.productsToDisplay = this.allProducts),
  //       data.products.forEach((product) => {
  //         product.discount = Math.round(product.discount);
  //         this.productCatgories = [];
  //         product.product_id = product.product_id.replace('/', '_');
  //         this.uniqueBrands.add(product.brand_name),
  //           this.uniqueColours.add(product.colour);
  //         product.size = String(product.size).split(',');
  //       }),
  //       this.uniqueCatgories.forEach((uniqueCatgory) => {
  //         if (uniqueCatgory) {
  //           this.catgories.push({
  //             label: uniqueCatgory,
  //             value: uniqueCatgory,
  //           });
  //         }
  //       }),
  //       this.uniqueSizes.forEach((uniqueSize) => {
  //         if (uniqueSize) {
  //           this.sizes.push({ label: uniqueSize, value: uniqueSize });
  //         }
  //       }),
  //       (this.sorted = this.sizes.sort((a, b) =>
  //         a.value < b.value ? -1 : 1
  //       )),
  //       this.uniqueBrands.forEach((uniqueBrand) => {
  //         if (uniqueBrand) {
  //           this.brands.push({ label: uniqueBrand, value: uniqueBrand });
  //         }
  //       });
  //     this.uniqueColours.forEach((uniqueColour) => {
  //       if (uniqueColour) {
  //         this.colours.push({ label: uniqueColour, value: uniqueColour });
  //       }
  //     });
  //     if (this.activatedroute.snapshot.queryParams.brand_name !== undefined) {
  //       if (
  //         typeof this.activatedroute.snapshot.queryParams.brand_name ===
  //         'string'
  //       ) {
  //         this.selectedBrands.push(
  //           this.activatedroute.snapshot.queryParams.brand_name
  //         );
  //       } else {
  //         this.selectedBrands = this.activatedroute.snapshot.queryParams.brand_name;
  //       }
  //       console.log(this.selectedBrands);
  //     }
  //     this.selectedColours = this.activatedroute.snapshot.queryParams.colour;
  //     this.position = this.activatedroute.snapshot.queryParams.page
  //       ? this.activatedroute.snapshot.queryParams.page * 20
  //       : 0;
  //   });

  // this.sortOptions = [
  //   { label: 'Aύξουσα Τιμή', value: 'price' },
  //   { label: 'Φθίνουσα Τιμή', value: '!price' },
  // ];
}
