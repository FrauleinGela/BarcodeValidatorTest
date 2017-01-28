import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BarcodeModule} from './barcode/barcode.module';
import {AppComponent} from './app.component';
export function loadBundledModule() {
  return BarcodeModule;
}


const routes: Routes = [
  {
    path: '',
    loadChildren: loadBundledModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppModuleRoutingModule {
}
