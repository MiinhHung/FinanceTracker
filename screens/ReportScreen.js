import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

export default function ReportScreen() {
  const [chartData, setChartData] = useState({
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3'],
    datasets: [{ data: [20, 45, 28] }],
  });
  const [totalsByCategory, setTotalsByCategory] = useState({
    'Ăn uống': 0,
    'Di chuyển': 0,
    'Lương': 0,
  });

  useEffect(() => {
    // Giả lập dữ liệu (thay bằng dữ liệu thực từ AsyncStorage sau)
    setTotalsByCategory({
      'Ăn uống': 50000,
      'Di chuyển': 30000,
      'Lương': 200000,
    });
  }, []);

  const screenWidth = Dimensions.get('window').width - 20;

  return (
    <View style={styles.container}>
      <Text>Biểu đồ thu chi theo tháng</Text>
      <LineChart
        data={chartData}
        width={screenWidth}
        height={220}
        yAxisLabel="VND "
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: { borderRadius: 16 },
        }}
        style={styles.chart}
      />
      <Text>Tổng kết theo loại:</Text>
      {Object.entries(totalsByCategory).map(([category, total]) => (
        <Text key={category} style={styles.category}>{category}: {total} VND</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  chart: { marginVertical: 8, borderRadius: 16 },
  category: { marginVertical: 5 },
});