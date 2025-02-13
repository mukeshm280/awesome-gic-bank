export interface Transaction {
  date: string;
  amount: number;
  balance: number;
  type: 'deposit' | 'withdraw';
}
