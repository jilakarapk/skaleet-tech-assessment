import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

import type { BeneficiaryScreenProps } from '../App';

import { useTransactions } from './TransactionContext';

const BeneficiaryScreen = ({ navigation }: BeneficiaryScreenProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [iban, setIban] = useState('');
  const [ibanError, setIbanError] = useState(false);

  const { addBeneficiary } = useTransactions();

  const handleBeneficiary = () => {
    const IBAN_PATTERN = /^[A-Z]{2}[0-9A-Z]*$/;

    const validateIban = IBAN_PATTERN.test(iban);

    if (validateIban) {
      setIbanError(false);
      addBeneficiary({ firstName, lastName, iban });
      navigation.goBack();
    } else {
      setIbanError(true);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={setFirstName}
        value={firstName}
        placeholder='First Name'
      />
      <TextInput
        style={styles.textInput}
        onChangeText={setLastName}
        value={lastName}
        placeholder='Last Name'
      />
      <TextInput
        style={styles.textInput}
        onChangeText={setIban}
        value={iban}
        placeholder='Recipient IBAN'
      />
      <Text style={{ color: 'red' }}>{ibanError ? 'Invalid IBAN' : ''}</Text>
      <Button title='Submit Beneficiary' onPress={handleBeneficiary} />
    </View>
  );
};

export default BeneficiaryScreen;

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
});
