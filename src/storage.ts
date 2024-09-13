import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Balance, Beneficiary, Transaction } from './types';

const BENEFICIARY_KEY = 'my-beneficiaries';
const TRANSACTION_KEY = 'my-transactions';
const BALANCE_KEY = 'my-balance';

/**
 * Beneficiary Storage Handlers
 */
export const storeBeneficiary = (newBeneficiary: Beneficiary) => {
  AsyncStorage.getItem(BENEFICIARY_KEY)
    .then((beneficiaries) => {
      if (beneficiaries) {
        const parsedBeneficiaries = JSON.parse(beneficiaries);
        parsedBeneficiaries.push(newBeneficiary);

        AsyncStorage.setItem(
          BENEFICIARY_KEY,
          JSON.stringify(parsedBeneficiaries)
        );
      } else {
        AsyncStorage.setItem(BENEFICIARY_KEY, JSON.stringify([newBeneficiary]));
      }
    })
    .catch((err) => console.log('STORE_BENEFICIARY_ERR--->>', err));
};

export const getBeneficiaries = () => {
  return AsyncStorage.getItem(BENEFICIARY_KEY)
    .then((beneficiaries) => {
      if (beneficiaries) {
        return JSON.parse(beneficiaries);
      } else {
        return [];
      }
    })
    .catch((err) => console.log('GET_BENEFICIARY_ERR--->>', err));
};

export const removeBeneficiaries = () => {
  AsyncStorage.removeItem(BENEFICIARY_KEY);
};

/**
 * Transaction Storage Handlers
 */
export const storeTransaction = (newTransaction: Transaction) => {
  AsyncStorage.getItem(TRANSACTION_KEY)
    .then((transactions) => {
      if (transactions) {
        const parsedTransactions = JSON.parse(transactions);
        parsedTransactions.push(newTransaction);

        AsyncStorage.setItem(
          TRANSACTION_KEY,
          JSON.stringify(parsedTransactions)
        );
      } else {
        AsyncStorage.setItem(TRANSACTION_KEY, JSON.stringify([newTransaction]));
      }
    })
    .catch((err) => console.log('STORE_TRANSACTION_ERR--->>', err));
};

export const getTransactions = () => {
  return AsyncStorage.getItem(TRANSACTION_KEY)
    .then((transactions) => {
      if (transactions) {
        return JSON.parse(transactions);
      } else {
        return [];
      }
    })
    .catch((err) => console.log('GET_TRANSACTION_ERR--->>', err));
};

export const removeTransactions = () => {
  AsyncStorage.removeItem(TRANSACTION_KEY);
};

/**
 * Balance Storage Handlers
 */
export const storeBalance = (updatedBalance: Balance) => {
  AsyncStorage.setItem(BALANCE_KEY, updatedBalance.toString()).catch((err) =>
    console.log('STORE_BALANCE_ERR--->>', err)
  );
};

export const getBalance = () => {
  return AsyncStorage.getItem(BALANCE_KEY)
    .then((balance) => {
      if (balance) {
        return parseInt(balance);
      } else {
        return 1000;
      }
    })
    .catch((err) => console.log('GET_BALANCE_ERR--->>', err));
};

export const removeBalance = () => {
  AsyncStorage.removeItem(BALANCE_KEY);
};
