import React, { useState, useEffect } from 'react';
import { StatusBar, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddTransactionScreen from './screens/AddTransactionScreen';
import ReportScreen from './screens/ReportScreen';
import ProfileScreen from './screens/ProfileScreen';

// Import theme
import { COLORS } from './theme';

// Ignore log notifications
LogBox.ignoreLogs(['Sending...']);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator({ onLogout }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Report') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.darkGray,
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Roboto-Medium',
        },
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          paddingTop: 5,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        options={{ title: 'Trang chủ' }}
      >
        {props => <HomeScreen {...props} onLogout={onLogout} />}
      </Tab.Screen>
      <Tab.Screen
        name="Report"
        options={{ title: 'Báo cáo' }}
        component={ReportScreen}
      />
      <Tab.Screen
        name="Profile"
        options={{ title: 'Tài khoản' }}
      >
        {props => <ProfileScreen {...props} onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
  });

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('userToken');
      if (storedToken) {
        setToken(storedToken);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (newToken) => {
    try {
      await AsyncStorage.setItem('userToken', newToken);
      setToken(newToken);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setToken(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (!fontsLoaded || loading) {
    return null; // Hiển thị màn hình splash hoặc loading screen ở đây
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="MainTabs">
              {props => <MainTabNavigator {...props} onLogout={handleLogout} />}
            </Stack.Screen>
            <Stack.Screen
              name="AddTransaction"
              component={AddTransactionScreen}
              options={{
                headerShown: true,
                title: 'Thêm giao dịch',
                headerStyle: { backgroundColor: COLORS.white },
                headerTintColor: COLORS.primary,
                headerTitleStyle: {
                  fontFamily: 'Roboto-Medium',
                }
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Login">
              {props => <LoginScreen {...props} onLogin={handleLogin} />}
            </Stack.Screen>
            <Stack.Screen name="Register">
              {props => <RegisterScreen {...props} onRegister={handleLogin} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}