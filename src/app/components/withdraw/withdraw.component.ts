import { Component, OnInit } from '@angular/core';
import { BankService } from '../../services/bank.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
  DEFAULT_CURRENCY,
  MAX_WITHDRAW,
  MIN_WITHDRAW,
} from '../../models/constants';

@Component({
  selector: 'app-withdraw',
  imports: [
    FormsModule,
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './withdraw.component.html',
  styleUrl: './withdraw.component.css',
})
export class WithdrawComponent implements OnInit {
  amount: number | null = null;
  message: string = '';
  totalBalance: number = 0;

  readonly MIN_WITHDRAW = MIN_WITHDRAW;
  readonly MAX_WITHDRAW = MAX_WITHDRAW;
  readonly DEFAULT_CURRENCY = DEFAULT_CURRENCY;

  constructor(private bankService: BankService) {}

  ngOnInit(): void {
    this.getBalance();
  }

  /**
   * Method to withdraw money from the account
   * @returns void
   */
  withdraw(): void {
    if (
      !this.amount ||
      this.amount < MIN_WITHDRAW ||
      this.amount > MAX_WITHDRAW
    ) {
      this.bankService.openSnackBar('Please enter a valid amount', 'Close');
      return;
    }
    this.message = this.bankService.withdraw(this.amount);
    this.amount = null;
    this.getBalance();
  }

  /**
   * Method to get the current balance
   */
  getBalance(): void {
    this.totalBalance = this.bankService.getBalance();
  }
}
