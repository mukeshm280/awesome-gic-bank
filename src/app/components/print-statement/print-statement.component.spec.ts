import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrintStatementComponent } from './print-statement.component';
import { Transaction } from '../../models/transaction.model';
import { BankService } from '../../services/bank.service';

// Mock data for transactions
class MockBankService {
  mockTransactions: Transaction[] = [
    { date: '2025-02-12', amount: 100, balance: 500 },
    { date: '2025-02-11', amount: 200, balance: 700 },
  ];
  getStatement() {
    return this.mockTransactions;
  }
}
describe('PrintStatementComponent', () => {
  let component: PrintStatementComponent;
  let fixture: ComponentFixture<PrintStatementComponent>;
  let bankService: BankService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintStatementComponent],
      providers: [{ provide: BankService, useClass: MockBankService }],
    }).compileComponents();

    fixture = TestBed.createComponent(PrintStatementComponent);
    bankService = TestBed.inject(BankService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call bankService.getStatement() during ngOnInit', () => {
    spyOn(bankService, 'getStatement').and.callThrough();
    component.ngOnInit();
    expect(component.transactions).toEqual(bankService.getStatement());
    expect(bankService.getStatement).toHaveBeenCalled();
  });
});
