import { Routes } from '@angular/router';
import { DepositComponent } from './components/deposit/deposit.component';
import { PrintStatementComponent } from './components/print-statement/print-statement.component';
import { WithdrawComponent } from './components/withdraw/withdraw.component';

// Define the routes
export const routes: Routes = [
  { path: 'deposit', component: DepositComponent },
  { path: 'withdraw', component: WithdrawComponent },
  { path: 'print-statement', component: PrintStatementComponent },
  { path: '**', redirectTo: '/' },
];
