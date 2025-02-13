import { Component, inject } from '@angular/core';
import { BankService } from '../../services/bank.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  DEFAULT_CURRENCY,
  MAX_DEPOSIT,
  MIN_DEPOSIT,
} from '../../models/constants';

@Component({
  selector: 'app-deposit',
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.css',
})
export class DepositComponent {
  amount: number | null = null;
  message: string = '';
  readonly MIN_DEPOSIT = MIN_DEPOSIT;
  readonly MAX_DEPOSIT = MAX_DEPOSIT;
  readonly DEFAULT_CURRENCY = DEFAULT_CURRENCY;
  constructor(private bankService: BankService) {}

  /**
   * Method to deposit money into the account
   * @returns void
   */
  deposit(): void {
    if (
      !this.amount ||
      this.amount < MIN_DEPOSIT ||
      this.amount > MAX_DEPOSIT
    ) {
      this.bankService.openSnackBar('Please enter a valid amount', 'Close');
      return;
    }
    this.message = this.bankService.deposit(this.amount);
    this.amount = null;
  }
}
