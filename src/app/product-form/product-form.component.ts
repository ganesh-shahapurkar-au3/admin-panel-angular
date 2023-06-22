import { Component, OnInit } from '@angular/core';
import { Product } from 'src/interface/product.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  product: Product;
  isEditForm: boolean;
  productId: string;
  productForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      productPrice: ['', Validators.required],
      productSKU: ['', Validators.required],
      productImages: [[]],
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditForm = true;
        this.productId = params['id'];
        this.getProduct(params['id']);
      }
    });
  }
  onSubmit() {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('productName', this.productForm.value.productName);
      formData.append('price', this.productForm.value.productPrice);
      formData.append('sku', this.productForm.value.productSKU);

      for (let file of this.productForm.value.productImages) {
        formData.append('images', file);
      }
      if (this.isEditForm) {
        this.updateProduct(formData);
        return;
      }
      this.addNewProduct(formData);
    } else alert('Plase fill valid data');
  }
  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files && files.length) {
      console.log(files);
      this.productForm.get('productImages').setValue(files);
    }
  }

  getProduct(productId: number) {
    this.productService.getProduct(productId).subscribe(
      (response) => {
        if (response.success) {
          this.product = response.product;
          this.productForm = this.formBuilder.group({
            productName: [response.product.product_name, Validators.required],
            productPrice: [response.product.product_price, Validators.required],
            productSKU: [response.product.product_SKU, Validators.required],
            productImages: [response.product.product_images],
          });
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  addNewProduct(formData: FormData) {
    this.productService.addNewProduct(formData).subscribe(
      (response) => {
        this.productForm.reset();
        alert('product added successful');
      },
      (error) => {
        console.error('Error in post request', error);
      }
    );
  }
  deteleProductImage(imageId: string) {
    this.productService.deleteProductImage(this.productId, imageId).subscribe(
      (response) => {
        alert('Image Deleted Successfully');
        this.product = {
          ...this.product,
          product_images: this.product.product_images.filter(
            (productImage) => productImage.id !== imageId
          ),
        };
      },
      (error) => {
        console.error('Error in post request', error);
      }
    );
  }
  updateProduct(formData: FormData) {
    for (let file of this.product.product_images) {
      formData.append('images', file);
    }
    this.productService.updateProduct(this.productId, formData).subscribe(
      (response) => {
        alert('Product Updated Successfully');
        const currentUrl = this.router.url;
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate([currentUrl]);
          });
      },
      (error) => {
        console.error('Error in post request', error);
      }
    );
  }
}
