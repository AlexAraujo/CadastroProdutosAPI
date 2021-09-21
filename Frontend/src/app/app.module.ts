import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { CurrencyMaskInputMode, NgxCurrencyModule } from "ngx-currency";
import { NgxMaskModule, IConfig } from 'ngx-mask'


import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ProdutosComponent } from './Produtos/Produtos.component';
import { ProdutosService } from './_services/produtos.service';
import { JwPaginationModule } from 'jw-angular-pagination';

export const customCurrencyMaskConfig = {
  align: "left",
  allowNegative: true,
  allowZero: false,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: ".",
  nullable: true,
  min: 0,
  max: 99999999,
  inputMode: CurrencyMaskInputMode.FINANCIAL
};


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    NgxMaskModule.forRoot(),
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwPaginationModule
  ],
  declarations: [
    AppComponent,
    ProdutosComponent,
    NavComponent,
   ],
  providers: [
    ProdutosService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
