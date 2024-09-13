import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import HomeScreen from './src/HomeScreen';
import TransactionScreen from './src/TransactionScreen';
import BeneficiaryScreen from './src/BeneficiaryScreen';

import { TransactionProvider } from './src/TransactionContext';
import { StatusBar } from 'expo-status-bar';

export type StackParamList = {
  Home: undefined;
  Transaction: undefined;
  Beneficiary: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<StackParamList, 'Home'>;
export type TransactionScreenProps = NativeStackScreenProps<
  StackParamList,
  'Transaction'
>;
export type BeneficiaryScreenProps = NativeStackScreenProps<
  StackParamList,
  'Beneficiary'
>;

const Stack = createNativeStackNavigator<StackParamList>();

const App = () => {
  return (
    <TransactionProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='Transaction' component={TransactionScreen} />
          <Stack.Screen name='Beneficiary' component={BeneficiaryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TransactionProvider>
  );
};

export default App;
