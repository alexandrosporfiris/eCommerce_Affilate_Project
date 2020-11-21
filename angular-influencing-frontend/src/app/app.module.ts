import { CategoriesService } from './category/categories/categories.service';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from './app.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';

import { LOCALE_ID, NgModule } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ListboxModule } from 'primeng/listbox';
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { ProductDataViewComponent } from './product/product-data-view/product-data-view.component';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './category/categories/categories.component';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NavbarComponent } from './navbar/navbar.component';

import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';

registerLocaleData(localeDe, 'de-DE', localeDeExtra);



@NgModule({
  declarations: [	
    AppComponent,
    ProductDetailsComponent,
    ProductDataViewComponent,
    HomeComponent,
    CategoriesComponent,
    NavbarComponent,
      HeaderComponent
   ],
  imports: [
    NgbModule,
    CommonModule,
    HttpClientModule,
    BreadcrumbModule,
    ListboxModule,
    DynamicDialogModule,
    GalleriaModule,
    FormsModule,
    ButtonModule,
    MultiSelectModule,
    DropdownModule,
    PanelModule,
    DialogModule,
    DataViewModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'app-root' }),
    BrowserTransferStateModule,
    NgbModule,
  ],
  entryComponents: [
    ProductDetailsComponent
  ],
  providers: [AppService, CategoriesService, {
    provide: LOCALE_ID,
    useValue: 'de-DE' // 'de-DE' for Germany, 'fr-FR' for France ...
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
