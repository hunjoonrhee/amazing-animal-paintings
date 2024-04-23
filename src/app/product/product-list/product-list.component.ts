import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../product.service';
import { CurrencyPipe, NgForOf } from '@angular/common';
import { MatCard, MatCardContent, MatCardImage, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { FlexModule } from '@angular/flex-layout';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgForOf, MatCard, MatCardImage, MatCardTitle, MatCardContent, MatCardSubtitle, CurrencyPipe, FlexModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  private productService = inject(ProductService);
  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }
}
