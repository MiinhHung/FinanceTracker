// theme.js
export const COLORS = {
  primary: '#6C63FF', // Màu chủ đạo - tím xanh 
  secondary: '#4ECDC4', // Màu phụ - xanh ngọc
  error: '#FF6B6B', // Đỏ cho chi tiêu
  success: '#2EC4B6', // Xanh cho thu nhập
  dark: '#2A2A2A', // Màu tối
  light: '#F7F7F7', // Màu sáng
  white: '#FFFFFF',
  lightGray: '#E8E8E8',
  mediumGray: '#9E9E9E',
  darkGray: '#616161',
  overlay: 'rgba(0,0,0,0.7)',
  transparentPrimary: 'rgba(108, 99, 255, 0.1)',
  transparentSecondary: 'rgba(78, 205, 196, 0.1)',
};

export const FONT = {
  regular: 'Roboto-Regular',
  medium: 'Roboto-Medium',
  bold: 'Roboto-Bold',
  light: 'Roboto-Light',
};

export const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
  padding: 16,
  margin: 16,
  radius: 12,
  buttonHeight: 56,
};

export const SHADOW = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  large: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
};