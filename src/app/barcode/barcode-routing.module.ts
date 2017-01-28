import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BarcodeComponent} from './barcode.component';

const routes: Routes = [{
  path: '',
  component: BarcodeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class BarcodeRoutingModule {
}
