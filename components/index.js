// components/index.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONT, SIZES, SHADOW } from '../src/theme';

export const Button = ({ title, onPress, type = "primary", icon, style }) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={[
        styles.button,
        type === "primary" ? styles.primaryButton : styles.secondaryButton,
        style
      ]}
    >
      {icon && <Ionicons name={icon} size={24} color={type === "primary" ? COLORS.white : COLORS.primary} style={styles.buttonIcon} />}
      <Text style={[
        styles.buttonText,
        type === "primary" ? styles.primaryButtonText : styles.secondaryButtonText
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export const Card = ({ children, style }) => {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
};

export const TransactionItem = ({ transaction, onPress }) => {
  // Xác định biểu tượng dựa trên loại giao dịch
  const getIcon = () => {
    if (transaction.type === 'Thu') {
      return 'arrow-down-circle';
    }
    return 'arrow-up-circle';
  };

  return (
    <TouchableOpacity style={styles.transactionItem} onPress={onPress}>
      <View style={[
        styles.iconContainer,
        {backgroundColor: transaction.type === 'Thu' ? COLORS.transparentSecondary : COLORS.transparentPrimary}
      ]}>
        <Ionicons 
          name={getIcon()} 
          size={24} 
          color={transaction.type === 'Thu' ? COLORS.success : COLORS.error} 
        />
      </View>
      <View style={styles.transactionInfo}>
        <Text style={styles.transactionTitle}>{transaction.title}</Text>
        <Text style={styles.transactionDate}>
          {new Date(transaction.dateTime).toLocaleDateString('vi-VN')}
        </Text>
      </View>
      <View style={styles.transactionAmount}>
        <Text style={[
          styles.amountText, 
          {color: transaction.type === 'Thu' ? COLORS.success : COLORS.error}
        ]}>
          {transaction.type === 'Thu' ? '+' : '-'}{transaction.amount.toLocaleString('vi-VN')} đ
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const CategoryBadge = ({ title, color, selected, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.categoryBadge,
        selected && {backgroundColor: color, borderColor: color}
      ]}
      onPress={onPress}
    >
      <Text 
        style={[
          styles.categoryText,
          selected && {color: COLORS.white}
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export const BalanceCard = ({ income, expense, balance }) => {
  return (
    <Card style={styles.balanceCard}>
      <Text style={styles.balanceTitle}>Tổng số dư</Text>
      <Text style={styles.balanceAmount}>{balance.toLocaleString('vi-VN')} đ</Text>
      <View style={styles.balanceDetails}>
        <View style={styles.balanceItem}>
          <Ionicons name="arrow-down-circle" size={20} color={COLORS.success} />
          <Text style={styles.balanceItemTitle}>Thu nhập</Text>
          <Text style={[styles.balanceItemAmount, {color: COLORS.success}]}>
            {income.toLocaleString('vi-VN')} đ
          </Text>
        </View>
        <View style={styles.balanceDivider} />
        <View style={styles.balanceItem}>
          <Ionicons name="arrow-up-circle" size={20} color={COLORS.error} />
          <Text style={styles.balanceItemTitle}>Chi tiêu</Text>
          <Text style={[styles.balanceItemAmount, {color: COLORS.error}]}>
            {expense.toLocaleString('vi-VN')} đ
          </Text>
        </View>
      </View>
    </Card>
  );
};

export const FormInput = ({ label, icon, error, ...props }) => {
  return (
    <View style={styles.inputContainer}>
      {label && <Text style={styles.inputLabel}>{label}</Text>}
      <View style={[styles.inputWrapper, error && styles.inputError]}>
        {icon && <Ionicons name={icon} size={20} color={COLORS.darkGray} style={styles.inputIcon} />}
        <TextInput
          style={styles.input}
          placeholderTextColor={COLORS.mediumGray}
          {...props}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  // Button styles
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: SIZES.buttonHeight,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    marginVertical: SIZES.margin / 2,
    ...SHADOW.small,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
  secondaryButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  buttonText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
  },
  primaryButtonText: {
    color: COLORS.white,
  },
  secondaryButtonText: {
    color: COLORS.primary,
  },
  buttonIcon: {
    marginRight: 10,
  },

  // Card styles
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginVertical: SIZES.margin / 2,
    ...SHADOW.small,
  },

  // Transaction Item styles
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.padding / 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.margin,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.dark,
  },
  transactionDate: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.mediumGray,
    marginTop: 2,
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
  },

  // Category Badge styles
  categoryBadge: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding / 3,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    marginRight: SIZES.margin / 2,
    marginBottom: SIZES.margin / 2,
  },
  categoryText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
    color: COLORS.darkGray,
  },

  // Balance Card styles
  balanceCard: {
    backgroundColor: COLORS.primary,
  },
  balanceTitle: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  balanceAmount: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xxLarge,
    color: COLORS.white,
    textAlign: 'center',
    marginVertical: SIZES.margin / 2,
  },
  balanceDetails: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginTop: SIZES.margin / 2,
  },
  balanceItem: {
    flex: 1,
    alignItems: 'center',
  },
  balanceDivider: {
    width: 1,
    backgroundColor: COLORS.lightGray,
  },
  balanceItemTitle: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.mediumGray,
    marginTop: 4,
  },
  balanceItemAmount: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    marginTop: 2,
  },

  // Form Input styles
  inputContainer: {
    marginBottom: SIZES.margin,
  },
  inputLabel: {
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
    color: COLORS.darkGray,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    height: 50,
    paddingHorizontal: SIZES.padding,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  input: {
    flex: 1,
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.dark,
  },
  inputIcon: {
    marginRight: 10,
  },
  errorText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.error,
    marginTop: 4,
  },
});