import { TestBed } from '@angular/core/testing';
import { BankService } from './bank.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';

class MockSnackBar {
  open(message: string, action: string): void {
    // This is a mock method, so no actual snackbar UI is shown
  }
}

describe('BankService', () => {
  let service: BankService;
  let snackBar: MockSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BankService,
        { provide: MatSnackBar, useClass: MockSnackBar },
      ],
    });
    service = TestBed.inject(BankService);
    snackBar = TestBed.inject(MatSnackBar) as unknown as MockSnackBar; // Mocked MatSnackBar
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should deposit money correctly and update balance', () => {
    const initialBalance = service.getBalance();
    const depositAmount = 100;
    const response = service.deposit(depositAmount);

    expect(response).toBe(`Thank you. $100.00 has been deposited to your account.`);
    expect(service.getBalance()).toBe(initialBalance + depositAmount);
  });

  it('should withdraw money correctly and update balance', () => {
    const initialBalance = service.getBalance();
    const depositAmount = 200;
    service.deposit(depositAmount);

    const withdrawAmount = 100;
    const response = service.withdraw(withdrawAmount);

    expect(response).toBe(`Thank you. $100.00 has been withdrawn.`);
    expect(service.getBalance()).toBe(initialBalance + depositAmount - withdrawAmount);
  });

  it('should return "Insufficient funds" when trying to withdraw more than balance', () => {
    const initialBalance = service.getBalance();
    const withdrawAmount = 100;
    const response = service.withdraw(withdrawAmount);

    expect(response).toBe('Insufficient funds.');
    expect(service.getBalance()).toBe(initialBalance); // Balance should not change
  });

  it('should add transaction correctly when deposit is made', () => {
    const depositAmount = 100;
    service.deposit(depositAmount);
    const transactions = service.getStatement();

    expect(transactions.length).toBe(1);
    expect(transactions[0].amount).toBe(depositAmount);
    expect(transactions[0].balance).toBe(depositAmount); // Balance should match deposit amount
  });

  it('should add transaction correctly when withdrawal is made', () => {
    const depositAmount = 200;
    service.deposit(depositAmount);

    const withdrawAmount = 100;
    service.withdraw(withdrawAmount);
    const transactions = service.getStatement();

    expect(transactions.length).toBe(2);
    expect(transactions[1].amount).toBe(-withdrawAmount); // Withdrawal is negative
    expect(transactions[1].balance).toBe(depositAmount - withdrawAmount); // Balance after withdrawal
  });

  it('should call openSnackBar after a successful deposit', () => {
    spyOn(snackBar, 'open');
    const depositAmount = 50;

    service.deposit(depositAmount);

    expect(snackBar.open).not.toHaveBeenCalled(); // No snackbar called for successful deposit
  });

  it('should call openSnackBar after a successful withdrawal', () => {
    spyOn(snackBar, 'open');
    const depositAmount = 200;
    service.deposit(depositAmount);

    const withdrawAmount = 100;
    service.withdraw(withdrawAmount);

    expect(snackBar.open).not.toHaveBeenCalled(); // No snackbar called for successful withdrawal
  });
});
