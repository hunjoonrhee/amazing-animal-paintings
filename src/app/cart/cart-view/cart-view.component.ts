import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../../models/product';
import { CurrencyPipe, NgForOf } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { MatList, MatListItem } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-cart-view',
  standalone: true,
  imports: [
    NgForOf,
    MatCard,
    MatList,
    MatListItem,
    CurrencyPipe,
    MatButton,
  ],
  templateUrl: './cart-view.component.html',
  styleUrl: './cart-view.component.css',
})
export class CartViewComponent implements OnInit {
  cartItems: Product[] = [];
  totalPrice: number = 0;
  private snackbar = inject(MatSnackBar);
  private cartService = inject(CartService);


  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((data)=> {
      this.cartItems = data;
      this.totalPrice = this.getTotalPrice();
    })
  }

  clearCart() {
    this.cartService.clearCart().subscribe({
      next: () => {
        this.snackbar.open('Cart cleared', '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
    });
  }

  getTotalPrice(): number {
    let total = 0;
    for (let item of this.cartItems) {
      total += item.price;
    }
    return total;
  }

  checkOut(products: Product[]) {
    this.cartService.checkOut(products).subscribe({
      next: () => {
        this.snackbar.open('Checkout succeed!', '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
    })
  }



}
