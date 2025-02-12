import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawComponent } from './withdraw.component';
import { BankService } from '../../services/bank.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Mock the BankService
class MockBankService {
  private balance: number = 1000; // Set a starting balance of 1000
  withdraw(amount: number) {
    if (amount > this.balance) {
      return 'Insufficient funds.';
    }
    this.balance -= amount;
    return `Withdrawn: $${amount.toFixed(2)}`;
  }
  getBalance() {
    return this.balance;
  }
  openSnackBar(message: string, action: string) {
    console.log('SnackBar called:', message);
  }
}

describe('WithdrawComponent', () => {
  let component: WithdrawComponent;
  let fixture: ComponentFixture<WithdrawComponent>;
  let bankService: BankService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithdrawComponent, BrowserAnimationsModule],
      providers: [{ provide: BankService, useClass: MockBankService }],
    }).compileComponents();

    fixture = TestBed.createComponent(WithdrawComponent);
    component = fixture.componentInstance;
    bankService = TestBed.inject(BankService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call openSnackBar if withdraw amount is less than MIN_WITHDRAW', () => {
    spyOn(bankService, 'openSnackBar'); // Spy on openSnackBar method

    component.amount = component.MIN_WITHDRAW - 1; // Set amount to be less than minimum
    component.withdraw();

    expect(bankService.openSnackBar).toHaveBeenCalledWith(
      'Please enter a valid amount',
      'Close'
    );
  });

  it('should call openSnackBar if withdraw amount is greater than MAX_WITHDRAW', () => {
    spyOn(bankService, 'openSnackBar'); // Spy on openSnackBar method

    component.amount = component.MAX_WITHDRAW + 1; // Set amount to be greater than maximum
    component.withdraw();

    expect(bankService.openSnackBar).toHaveBeenCalledWith(
      'Please enter a valid amount',
      'Close'
    );
  });

  it('should call withdraw on BankService and update message if amount is valid', () => {
    spyOn(bankService, 'withdraw').and.callThrough(); // Spy on withdraw method
    spyOn(bankService, 'openSnackBar'); // Ensure openSnackBar is not called in this case

    const validAmount = 500; // Set a valid withdraw amount within the range
    component.amount = validAmount;
    component.withdraw();

    expect(bankService.withdraw).toHaveBeenCalledWith(validAmount);
    expect(component.message).toBe(`Withdrawn: $${validAmount.toFixed(2)}`);
    expect(component.amount).toBe(1); // Ensure the amount is reset to 1 after withdrawal
    expect(component.totalBalance).toBe(500); // Ensure the balance is updated after withdrawal
  });
  it('should not call withdraw method on BankService if amount is invalid', () => {
    spyOn(bankService, 'withdraw'); // Spy on withdraw method

    component.amount = component.MIN_WITHDRAW - 1; // Set amount below minimum
    component.withdraw();

    expect(bankService.withdraw).not.toHaveBeenCalled(); // Ensure withdraw is not called
  });
  it('should display "Insufficient funds." if withdrawal exceeds balance', () => {
    component.amount = bankService.getBalance() + 100; // Amount greater than available balance
    component.withdraw();
    expect(component.message).toEqual('Insufficient funds.'); // Verify the message displayed
  });
});
