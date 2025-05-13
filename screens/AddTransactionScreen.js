import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Picker } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddTransactionScreen({ navigation }) {
  const [type, setType] = useState('Thu');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [dateTime, setDateTime] = useState(new Date().toISOString().slice(0, 16));
  const [note, setNote] = useState('');

  const saveTransaction = async () => {
    if (!title || !amount) {
      alert('Vui lòng nhập tiêu đề và số tiền');
      return;
    }
    const newTransaction = {
      id: Date.now().toString(),
      type,
      title,
      amount: parseFloat(amount),
      dateTime,
      note,
    };
    try {
      const stored = await AsyncStorage.getItem('transactions');
      const transactions = stored ? JSON.parse(stored) : [];
      transactions.push(newTransaction);
      await AsyncStorage.setItem('transactions', JSON.stringify(transactions));
      navigation.goBack();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <Picker selectedValue={type} onValueChange={setType} style={styles.picker}>
        <Picker.Item label="Thu" value="Thu" />
        <Picker.Item label="Chi" value="Chi" />
      </Picker>
      <TextInput style={styles.input} placeholder="Tiêu đề giao dịch" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Số tiền" keyboardType="numeric" value={amount} onChangeText={setAmount} />
      <TextInput style={styles.input} placeholder="Ngày giờ" value={dateTime} onChangeText={setDateTime} />
      <TextInput style={styles.input} placeholder="Ghi chú" value={note} onChangeText={setNote} />
      <Button title="Lưu" onPress={saveTransaction} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  picker: { height: 50, width: '100', marginBottom: 10 },
});