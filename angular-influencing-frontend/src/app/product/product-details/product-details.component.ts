import { Component, OnInit } from '@angular/core';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import { Product} from "../../../assets/intefaces/product";


@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  selectedProduct: Product;

  constructor(public ref: DynamicDialogRef , public config: DynamicDialogConfig) { }

  ngOnInit() {
    this.selectedProduct = this.config.data.selectedProduct;
  }

}
