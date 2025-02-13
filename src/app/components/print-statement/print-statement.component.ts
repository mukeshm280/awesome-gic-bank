import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BankService } from '../../services/bank.service';
import { Transaction } from '../../models/transaction.model';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-print-statement',
  imports: [CommonModule, FormsModule, MatTableModule, MatCardModule],
  templateUrl: './print-statement.component.html',
  styleUrl: './print-statement.component.css',
})
export class PrintStatementComponent {
  transactions: Transaction[] = [];
  displayedColumns: string[] = ['date', 'type', 'amount', 'balance'];
  constructor(private bankService: BankService) {}

  ngOnInit(): void {
    this.transactions = this.bankService.getStatement(); // get the transaction history
  }
}
