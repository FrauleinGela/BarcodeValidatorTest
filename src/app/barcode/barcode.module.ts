import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BarcodeRoutingModule} from './barcode-routing.module';
import {BarcodeComponent} from './barcode.component';
import {FormsModule} from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    BarcodeRoutingModule,
    FormsModule
  ],
  declarations: [BarcodeComponent]
})
export class BarcodeModule {
}
