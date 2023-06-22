import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductViewComponent } from './product-view/product-view.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';

const routes: Routes = [
  {
    path: 'product/:id',
    component: ProductViewComponent,
  },
  {
    path: '',
    component: ProductListComponent,
  },
  {
    path: 'products',
    component: ProductListComponent,
  },
  { path: 'productform/add', component: ProductFormComponent },
  { path: 'productform/edit/:id', component: ProductFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
