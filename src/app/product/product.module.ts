import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { FlexModule } from '@angular/flex-layout';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatCardModule, FlexModule, MatSnackBarModule, MatInputModule, MatSelectModule],
})
export class ProductModule {}
