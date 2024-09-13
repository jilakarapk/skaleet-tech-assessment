export type Balance = number;

export type TransactionAccount = {
  name: string;
  iban: string;
};

export type Beneficiary = {
  firstName: string;
  lastName: string;
  iban: string;
};

export type Transaction = {
  id: number;
  amount: number;
  account: TransactionAccount;
};

export type TransactionContextType = {
  balance: number;
  transactions: Transaction[];
  addTransaction: (amount: string, account: TransactionAccount) => void;
  beneficiaries: Beneficiary[];
  addBeneficiary: (beneficiary: Beneficiary) => void;
};
