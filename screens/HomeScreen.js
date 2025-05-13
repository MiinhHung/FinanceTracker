import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, SIZES, FONT, SHADOW } from '../theme';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [userName, setUserName] = useState('Người dùng');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('Tháng');

  useEffect(() => {
    loadTransactions();
    loadUserInfo();

    // Đăng ký lắng nghe sự kiện focus để load dữ liệu khi quay lại màn hình
    const unsubscribe = navigation.addListener('focus', () => {
      loadTransactions();
    });

    return unsubscribe;
  }, [navigation]);

  const loadUserInfo = async () => {
    try {
      const name = await AsyncStorage.getItem('userName');
      if (name) {
        setUserName(name);
      }
    } catch (error) {
      console.error('Error loading user info:', error);
    }
  };

  const loadTransactions = async () => {
    try {
      setRefreshing(true);
      const stored = await AsyncStorage.getItem('transactions');
      if (stored) {
        const txns = JSON.parse(stored);
        setTransactions(txns.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime)));
        calculateTotals(txns);
      }
    } catch (error) {
      console.error('Error loading transactions:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const calculateTotals = (txns) => {
    const income = txns.filter(t => t.type === 'Thu').reduce((sum, t) => sum + t.amount, 0);
    const expense = txns.filter(t => t.type === 'Chi').reduce((sum, t) => sum + t.amount, 0);
    setTotalIncome(income);
    setTotalExpense(expense);
    setBalance(income - expense);
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString('vi-VN');
  };

  const renderTransactionItem = ({ item }) => {
    // Tạo biểu tượng ngẫu nhiên cho giao dịch dựa trên loại
    const getIcon = () => {
      if (item.type === 'Thu') {
        const incomeIcons = ['cash-outline', 'wallet-outline', 'card-outline', 'gift-outline'];
        return incomeIcons[Math.floor(Math.random() * incomeIcons.length)];
      } else {
        const expenseIcons = ['cart-outline', 'fast-food-outline', 'bus-outline', 'home-outline', 'medkit-outline'];
        return expenseIcons[Math.floor(Math.random() * expenseIcons.length)];
      }
    };

    return (
      <TouchableOpacity 
        style={styles.transactionItem}
        onPress={() => navigation.navigate('TransactionDetail', { transaction: item })}
      >
        <View style={[
          styles.iconContainer,
          {backgroundColor: item.type === 'Thu' ? COLORS.transparentSecondary : COLORS.transparentPrimary}
        ]}>
          <Ionicons 
            name={getIcon()} 
            size={24} 
            color={item.type === 'Thu' ? COLORS.success : COLORS.error} 
          />
        </View>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionTitle}>{item.title}</Text>
          <Text style={styles.transactionDate}>
            {new Date(item.dateTime).toLocaleDateString('vi-VN')}
          </Text>
        </View>
        <View style={styles.transactionAmount}>
          <Text style={[
            styles.amountText, 
            {color: item.type === 'Thu' ? COLORS.success : COLORS.error}
          ]}>
            {item.type === 'Thu' ? '+' : '-'}{formatCurrency(item.amount)} đ
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyList = () => {
    return (
      <View style={styles.emptyContainer}>
        <Image
          source={require('../assets/empty.png')}
          style={styles.emptyImage}
          resizeMode="contain"
        />
        <Text style={styles.emptyTitle}>Chưa có giao dịch nào</Text>
        <Text style={styles.emptyText}>
          Hãy thêm giao dịch đầu tiên để bắt đầu quản lý tài chính của bạn!
        </Text>
      </View>
    );
  };

  const onRefresh = () => {
    loadTransactions();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.userInfo}>
            <Text style={styles.greeting}>Xin chào,</Text>
            <Text style={styles.userName}>{userName}</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color={COLORS.white} />
            <View style={styles.badge} />
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceTitle}>Tổng số dư</Text>
          <Text style={styles.balanceAmount}>{formatCurrency(balance)} đ</Text>
          <View style={styles.balanceDetails}>
            <View style={styles.balanceItem}>
              <Ionicons name="arrow-down-circle" size={20} color={COLORS.success} />
              <Text style={styles.balanceItemTitle}>Thu nhập</Text>
              <Text style={[styles.balanceItemAmount, {color: COLORS.success}]}>
                {formatCurrency(totalIncome)} đ
              </Text>
            </View>
            <View style={styles.balanceDivider} />
            <View style={styles.balanceItem}>
              <Ionicons name="arrow-up-circle" size={20} color={COLORS.error} />
              <Text style={styles.balanceItemTitle}>Chi tiêu</Text>
              <Text style={[styles.balanceItemAmount, {color: COLORS.error}]}>
                {formatCurrency(totalExpense)} đ
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Period Tabs */}
      <View style={styles.periodContainer}>
        {['Ngày', 'Tuần', 'Tháng', 'Năm'].map((period) => (
          <TouchableOpacity 
            key={period}
            style={[
              styles.periodTab,
              selectedPeriod === period && styles.periodTabActive
            ]}
            onPress={() => setSelectedPeriod(period)}
          >
            <Text style={[
              styles.periodText,
              selectedPeriod === period && styles.periodTextActive
            ]}>
              {period}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Transactions List */}
      <View style={styles.transactionsContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Lịch sử giao dịch</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Report')}>
            <Text style={styles.seeAllText}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={transactions.slice(0, 5)} // Hiển thị 5 giao dịch gần nhất
          renderItem={renderTransactionItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.transactionsList}
          ListEmptyComponent={renderEmptyList}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.primary]}
            />
          }
        />
      </View>

      {/* Add Transaction Button */}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTransaction')}
      >
        <Ionicons name="add" size={30} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: SIZES.padding * 2,
    paddingBottom: SIZES.padding * 3,
    paddingHorizontal: SIZES.padding,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  userInfo: {
    flex: 1,
  },
  greeting: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  userName: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.white,
  },
  notificationButton: {
    position: 'relative',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.error,
  },
  balanceCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    ...SHADOW.medium,
  },
  balanceTitle: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.darkGray,
    textAlign: 'center',
  },
  balanceAmount: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xxLarge,
    color: COLORS.dark,
    textAlign: 'center',
    marginVertical: SIZES.padding / 2,
  },
  balanceDetails: {
    flexDirection: 'row',
    backgroundColor: COLORS.light,
    borderRadius: SIZES.radius / 2,
    padding: SIZES.padding / 2,
    marginTop: SIZES.padding / 2,
  },
  balanceItem: {
    flex: 1,
    alignItems: 'center',
    padding: SIZES.padding / 2,
  },
  balanceDivider: {
    width: 1,
    backgroundColor: COLORS.lightGray,
  },
  balanceItemTitle: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.darkGray,
    marginTop: 4,
  },
  balanceItemAmount: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    marginTop: 2,
  },
  periodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: SIZES.padding,
    marginTop: SIZES.padding,
  },
  periodTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SIZES.padding / 2,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    marginHorizontal: 5,
  },
  periodTabActive: {
    borderBottomColor: COLORS.primary,
  },
  periodText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
    color: COLORS.darkGray,
  },
  periodTextActive: {
    color: COLORS.primary,
    fontFamily: FONT.bold,
  },
  transactionsContainer: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    marginTop: SIZES.padding,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  sectionTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.dark,
  },
  seeAllText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
    color: COLORS.primary,
  },
  transactionsList: {
    paddingBottom: 100, // Extra space for FAB button
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.padding / 2,
    ...SHADOW.small,
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
    color: COLORS.darkGray,
    marginTop: 2,
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOW.large,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: SIZES.padding * 2,
  },
  emptyImage: {
    width: width * 0.5,
    height: width * 0.5,
    marginBottom: SIZES.padding,
  },
  emptyTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.dark,
    marginBottom: SIZES.padding / 2,
  },
  emptyText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.darkGray,
    textAlign: 'center',
    paddingHorizontal: SIZES.padding * 2,
  },
});