import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONT, SHADOW } from '../theme';

export default function LoginScreen({ navigation, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = () => {
    // Reset errors
    setEmailError('');
    setPasswordError('');
    
    // Validate form
    let isValid = true;
    
    if (!email) {
      setEmailError('Email không được để trống');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Email không đúng định dạng');
      isValid = false;
    }
    
    if (!password) {
      setPasswordError('Mật khẩu không được để trống');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Mật khẩu phải có ít nhất 6 ký tự');
      isValid = false;
    }
    
    if (isValid) {
      // Giả lập API login (thay bằng API thật sau)
      const mockToken = 'dummy-token-123';
      onLogin(mockToken);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>Money Tracker</Text>
          <Text style={styles.appSlogan}>Quản lý tài chính cá nhân hiệu quả</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <View style={[
              styles.inputWrapper,
              emailError ? styles.inputError : null,
            ]}>
              <Ionicons name="mail-outline" size={20} color={COLORS.darkGray} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Nhập email của bạn"
                placeholderTextColor={COLORS.mediumGray}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setEmailError('');
                }}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Mật khẩu</Text>
            <View style={[
              styles.inputWrapper,
              passwordError ? styles.inputError : null,
            ]}>
              <Ionicons name="lock-closed-outline" size={20} color={COLORS.darkGray} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Nhập mật khẩu"
                placeholderTextColor={COLORS.mediumGray}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setPasswordError('');
                }}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.passwordIcon}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={COLORS.darkGray}
                />
              </TouchableOpacity>
            </View>
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Đăng nhập</Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>hoặc</Text>
            <View style={styles.divider} />
          </View>

          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-google" size={24} color="#DB4437" />
            <Text style={styles.socialButtonText}>Đăng nhập với Google</Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Chưa có tài khoản? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerLink}>Đăng ký ngay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SIZES.padding * 1.5,
    paddingBottom: SIZES.padding * 2,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: SIZES.padding * 4,
    marginBottom: SIZES.padding * 2,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: SIZES.padding,
  },
  appName: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginBottom: SIZES.padding / 4,
  },
  appSlogan: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.darkGray,
    textAlign: 'center',
  },
  formContainer: {
    marginTop: SIZES.padding,
  },
  inputContainer: {
    marginBottom: SIZES.padding,
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
    height: 55,
    paddingHorizontal: SIZES.padding,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.dark,
  },
  passwordIcon: {
    padding: 5,
  },
  errorText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.error,
    marginTop: 5,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: SIZES.padding,
  },
  forgotPasswordText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
    color: COLORS.primary,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: SIZES.padding,
    ...SHADOW.small,
  },
  loginButtonText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.white,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SIZES.padding,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.lightGray,
  },
  dividerText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.mediumGray,
    paddingHorizontal: SIZES.padding,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    height: 55,
    marginBottom: SIZES.padding,
    ...SHADOW.small,
  },
  socialButtonText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.dark,
    marginLeft: SIZES.padding,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SIZES.padding,
  },
  registerText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.darkGray,
  },
  registerLink: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
});