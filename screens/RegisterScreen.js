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

export default function RegisterScreen({ navigation, onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleRegister = () => {
    // Reset errors
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    
    // Validate form
    let isValid = true;
    
    if (!name) {
      setNameError('Họ tên không được để trống');
      isValid = false;
    }
    
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
    
    if (!confirmPassword) {
      setConfirmPasswordError('Vui lòng xác nhận mật khẩu');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Mật khẩu xác nhận không khớp');
      isValid = false;
    }
    
    if (isValid) {
      // Giả lập API register (thay bằng API thật sau)
      const mockToken = 'dummy-token-123';
      onRegister(mockToken);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.darkGray} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Tạo tài khoản</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Họ tên</Text>
            <View style={[
              styles.inputWrapper,
              nameError ? styles.inputError : null,
            ]}>
              <Ionicons name="person-outline" size={20} color={COLORS.darkGray} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Nhập họ tên của bạn"
                placeholderTextColor={COLORS.mediumGray}
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  setNameError('');
                }}
              />
            </View>
            {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
          </View>

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
                placeholder="Tạo mật khẩu"
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

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Xác nhận mật khẩu</Text>
            <View style={[
              styles.inputWrapper,
              confirmPasswordError ? styles.inputError : null,
            ]}>
              <Ionicons name="lock-closed-outline" size={20} color={COLORS.darkGray} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Xác nhận mật khẩu"
                placeholderTextColor={COLORS.mediumGray}
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  setConfirmPasswordError('');
                }}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.passwordIcon}>
                <Ionicons
                  name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={COLORS.darkGray}
                />
              </TouchableOpacity>
            </View>
            {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
          </View>

          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>Đăng ký</Text>
          </TouchableOpacity>

          <View style={styles.policyContainer}>
            <Text style={styles.policyText}>
              Bằng cách đăng ký, bạn đồng ý với{' '}
              <Text style={styles.policyLink}>Điều khoản dịch vụ</Text> và{' '}
              <Text style={styles.policyLink}>Chính sách bảo mật</Text> của chúng tôi
            </Text>
          </View>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Đã có tài khoản? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Đăng nhập</Text>
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.padding * 3,
    marginBottom: SIZES.padding * 2,
  },
  backButton: {
    padding: SIZES.padding / 2,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.dark,
    marginRight: SIZES.padding * 2, // Compensate for back button
  },
  formContainer: {
    flex: 1,
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
  registerButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: SIZES.padding,
    ...SHADOW.small,
  },
  registerButtonText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.white,
  },
  policyContainer: {
    marginVertical: SIZES.padding,
  },
  policyText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.darkGray,
    textAlign: 'center',
    lineHeight: 20,
  },
  policyLink: {
    fontFamily: FONT.medium,
    color: COLORS.primary,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SIZES.padding,
  },
  loginText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.darkGray,
  },
  loginLink: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
});