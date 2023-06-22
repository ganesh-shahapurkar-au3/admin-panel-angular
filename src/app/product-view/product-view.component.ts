import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/interface/product.interface';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css'],
})
export class ProductViewComponent implements OnInit {
  product: Product;
  productId: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
    });
    this.productService.getProduct(this.productId).subscribe(
      (response) => {
        if (response.success) {
          this.product = response.product;
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onClickToEdit(): void {
    this.router.navigate([`/productform/edit/${this.productId}`]);
  }
}
