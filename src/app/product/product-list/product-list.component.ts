import { ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../product.service';
import { CurrencyPipe, NgForOf } from '@angular/common';
import { MatCard, MatCardContent, MatCardImage, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { FlexModule } from '@angular/flex-layout';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { filter } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    NgForOf,
    MatCard,
    MatCardImage,
    MatCardTitle,
    MatCardContent,
    MatCardSubtitle,
    CurrencyPipe,
    FlexModule,
    MatFormField,
    MatInput,
    MatSelect,
    MatOption,
    MatPaginator,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  sortOrder: string = '';
  pageSize: number = 5;
  productsPerPage: Product[] = [];
  private productService = inject(ProductService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = data;
      this.onPaginateChange();
    });
  }

  applyFilter(event: Event) {
    let searchTerm = (event.target as HTMLInputElement).value;
    if (searchTerm !== '') {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.onPaginateChange();
    }
    if (this.sortOrder !== '') {
      this.sortProducts(this.sortOrder);
    }
  }

  sortProducts(sortOrder: string) {
    this.sortOrder = sortOrder;
    if (this.sortOrder === 'priceLowHigh') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (this.sortOrder === 'priceHighLow') {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    }
  }

  onPaginateChange(event?: PageEvent) {
    if (event) {
      const startIndex = event.pageIndex * event.pageSize;
      const endIndex = startIndex + event.pageSize;
      this.filteredProducts = this.products.slice(startIndex, endIndex);
    } else {
      this.filteredProducts = this.products.slice(0, this.pageSize);
    }
  }

  protected readonly filter = filter;
}
