import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DepositComponent } from './deposit.component';
import { BankService } from '../../services/bank.service';
// Mock the BankService
class MockBankService {
  deposit(amount: number) {
    return `Deposited: $${amount.toFixed(2)}`;
  }
  openSnackBar(message: string, action: string) {
    console.log('SnackBar called:', message);
  }
}
describe('DepositComponent', () => {
  let component: DepositComponent;
  let fixture: ComponentFixture<DepositComponent>;
  let bankService: BankService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepositComponent, BrowserAnimationsModule],
      providers: [{ provide: BankService, useClass: MockBankService }],
    }).compileComponents();

    fixture = TestBed.createComponent(DepositComponent);
    component = fixture.componentInstance;
    bankService = TestBed.inject(BankService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call openSnackBar if deposit amount is less than MIN_DEPOSIT', () => {
    spyOn(bankService, 'openSnackBar'); // Spy on openSnackBar method

    component.amount = component.MIN_DEPOSIT - 1; // Set amount to be less than minimum
    component.deposit();

    expect(bankService.openSnackBar).toHaveBeenCalledWith(
      'Please enter a valid amount',
      'Close'
    );
  });
  it('should call deposit on BankService and update message if amount is valid', () => {
    spyOn(bankService, 'deposit').and.callThrough(); // Spy on deposit method
    spyOn(bankService, 'openSnackBar'); // Ensure openSnackBar is not called in this case

    const validAmount = 500; // Set a valid deposit amount within the range
    component.amount = validAmount;
    component.deposit();

    expect(bankService.deposit).toHaveBeenCalledWith(validAmount);
    expect(component.message).toBe(`Deposited: $${validAmount.toFixed(2)}`);
    expect(component.amount).toBe(1); // Ensure the amount is reset to 1 after deposit
  });

  it('should not call deposit method on BankService if amount is invalid', () => {
    spyOn(bankService, 'deposit'); // Spy on deposit method

    component.amount = component.MIN_DEPOSIT - 1; // Set amount below minimum
    component.deposit();

    expect(bankService.deposit).not.toHaveBeenCalled(); // Ensure deposit is not called
  });
  it('should reset the amount to 1 after a successful deposit', () => {
    component.amount = 500; // Set a valid deposit amount
    component.deposit();

    expect(component.amount).toBe(1); // Amount should reset to 1
  });
});
