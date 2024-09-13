import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from 'react';

import * as storage from './storage';

import type {
  Balance,
  Beneficiary,
  Transaction,
  TransactionAccount,
  TransactionContextType,
} from './types';

const TransactionContext = createContext<TransactionContextType>({
  balance: 0,
  transactions: [],
  addTransaction: () => {},
  beneficiaries: [],
  addBeneficiary: () => {},
});

export const useTransactions = () => useContext(TransactionContext);

type TransactionProviderProps = {
  children: ReactNode;
};

export const TransactionProvider = ({ children }: TransactionProviderProps) => {
  const [balance, setBalance] = useState<Balance>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);

  const fetchData = async () => {
    const fBens = await storage.getBeneficiaries();
    const fTrans = await storage.getTransactions();
    const fBal = (await storage.getBalance()) as number;

    setBeneficiaries(fBens);
    setTransactions(fTrans);
    setBalance(fBal);
  };

  const clearAllData = () => {
    storage.removeBeneficiaries();
    storage.removeTransactions();
    storage.removeBalance();
  };

  useEffect(() => {
    fetchData();

    /**
     * Clears persistent storage
     */
    // clearAllData();
  }, []);

  const addTransaction = (amount: string, account: TransactionAccount) => {
    const newTransaction = {
      id: Date.now(),
      amount: parseFloat(amount),
      account,
    };

    storage.storeTransaction(newTransaction);
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      newTransaction,
    ]);

    setBalance((prevBalance) => {
      const newBalance = prevBalance - parseFloat(amount);
      storage.storeBalance(newBalance);
      return newBalance;
    });
  };

  const addBeneficiary = (beneficiary: Beneficiary) => {
    storage.storeBeneficiary(beneficiary);
    setBeneficiaries((prevBeneficiaries) => [
      ...prevBeneficiaries,
      beneficiary,
    ]);
  };

  return (
    <TransactionContext.Provider
      value={{
        balance,
        transactions,
        addTransaction,
        beneficiaries,
        addBeneficiary,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
