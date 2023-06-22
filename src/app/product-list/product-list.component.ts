import { Component, OnInit } from '@angular/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router } from '@angular/router';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: any[];

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }
  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe(
      (response) => {
        this.products = this.products.filter((product) => product.id !== id);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  onClickProductClick(id: string): void {
    this.router.navigate(['/product', id]);
  }
  onClickDelelteClick(id: string): void {
    if (confirm('Are you sure to delete product') == false) {
      return;
    } else {
      this.deleteProduct(id);
    }
  }
  onClickAddNewClick(): void {
    this.router.navigate(['/productform/add']);
  }
}
