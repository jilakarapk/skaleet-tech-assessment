import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

import { Picker } from '@react-native-picker/picker';

import type { TransactionScreenProps } from '../App';
import type { Beneficiary } from './types';

import { useTransactions } from './TransactionContext';

const TransactionScreen = ({ navigation }: TransactionScreenProps) => {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [iban, setIban] = useState('');

  const [pickerToggle, setPickerToggle] = useState(false);

  const { addTransaction, beneficiaries } = useTransactions();

  const togglePicker = () => {
    setPickerToggle((prev) => !prev);
  };

  const handleTransaction = () => {
    const accountDetails = { name, iban };
    addTransaction(amount, accountDetails);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={setAmount}
        value={amount}
        keyboardType='numeric'
        placeholder='Enter amount'
      />
      <TextInput
        style={styles.textInput}
        onChangeText={setName}
        value={name}
        placeholder='Recipient Name'
      />

      <Text style={styles.ibanText} onPress={togglePicker}>
        Recipient IBAN: {iban}
      </Text>
      {pickerToggle && beneficiaries.length > 0 && (
        <Picker
          style={styles.ibanPicker}
          selectedValue={iban}
          onValueChange={(itemValue) => setIban(itemValue)}
        >
          {beneficiaries.map((beneficiary: Beneficiary) => (
            <Picker.Item
              key={beneficiary.iban}
              label={beneficiary.iban}
              value={beneficiary.iban}
            />
          ))}
        </Picker>
      )}
      <Button title='Submit Transaction' onPress={handleTransaction} />
    </View>
  );
};

export default TransactionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 100,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginVertical: 8,
  },
  ibanText: {
    marginVertical: 26,
    textDecorationLine: 'underline',
  },
  ibanPicker: {
    backgroundColor: '#e6e6e6',
    paddingVertical: 90,
    height: 0,
    width: '80%',
    justifyContent: 'center',
    borderRadius: 10,
  },
});
