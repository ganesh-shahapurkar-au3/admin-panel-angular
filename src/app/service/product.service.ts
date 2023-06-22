import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/interface/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  updateProduct(productId: string, formData: FormData): Observable<any> {
    const url = `${this.apiUrl}/updateProduct/${productId}`;
    return this.http.put<any>(url, formData);
  }

  deleteProductImage(productId: string, imageId: string): Observable<any> {
    const url = `${this.apiUrl}/deleteProductImages/${productId}/${imageId}`;
    return this.http.get<any>(url);
  }

  addNewProduct(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addProduct`, formData);
  }

  getProduct(productId: number): Observable<any> {
    return this.http.get<{ success: boolean; product: Product }>(
      `${this.apiUrl}/getProduct/${productId}`
    );
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any[]>(`${this.apiUrl}/deleteProduct/${id}`);
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getProducts`);
  }
}
