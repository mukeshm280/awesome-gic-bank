import { inject, Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { MatSnackBar } from '@angular/material/snack-bar';

// This service handles bank transactions including deposits, withdrawals, and balance inquiries.
@Injectable({
  providedIn: 'root',
})
export class BankService {
  private balance = 0;
  private transactions: Transaction[] = [];
  private _snackBar = inject(MatSnackBar);

  /**
   * Method to deposit money into the account
   * @param amount : number in valid range
   * @returns message : string
   */
  deposit(amount: number): string {
    this.balance += amount;
    this.addTransaction(amount, 'deposit');
    return `Thank you. $${amount.toFixed(
      2
    )} has been deposited to your account.`;
  }

  /**
   * Method to withdraw money from the account
   * @param amount : any number in valid range
   * @returns message : string
   */
  withdraw(amount: number): string {
    if (amount > this.balance) {
      return 'Insufficient funds.';
    }
    this.balance -= amount;
    this.addTransaction(-amount, 'withdraw');
    return `Thank you. $${amount.toFixed(2)} has been withdrawn.`;
  }

  /**
   * Returns the transaction history
   * @returns statement : Transaction[]
   */
  getStatement(): Transaction[] {
    return this.sortTransactionsByDate(this.transactions);
  }

  /**
   * Method to add a transaction to the transaction history
   * @param amount : number
   */
  private addTransaction(amount: number, type: 'deposit' | 'withdraw'): void {
    this.transactions.push({
      date: new Date().toLocaleString(),
      amount: amount,
      balance: this.balance,
      type: type,
    });
  }

  /**
   * Method to get the current balance
   * @returns balance : number
   */
  getBalance(): number {
    return this.balance;
  }

  /**
   * Method to display a snackbar message
   * @param message : message to display
   * @param action : action to display
   */
  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action);
  }

  /**
   * utility method to sort transactions by date
   * @param transactions
   * @returns sorted transactions
   */
  sortTransactionsByDate(transactions: Transaction[]): Transaction[] {
    return transactions.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
}
