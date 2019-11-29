import { Platform } from 'react-native';

export const Colors = {
  darkGrey: '#444444',
  midGrey: '#666666',
  lightGrey: '#cccccc',
  cyan: '#2BB7B3',
  red: '#FF0000',
  green: '#006300',
  yellow: '#ffd52a',
  white: '#FFFFFF',

  weChat: '#7CC045',
  facebook: '#2F5597',
  linkedIn: '#0097D3'
};

export const FontSize = {
  xs: 12,
  s: 14,
  m: 15,
  l: 16,
  xl: 18,
  xxl: 20
};

export const FontFamily = {
  primaryFontThin: Platform.OS === 'ios' ? 'Roboto Thin' : 'RobotoThin',
  primaryFontLight: Platform.OS === 'ios' ? 'Roboto Light' : 'RobotoLight',
  primaryFontRegular: Platform.OS === 'ios' ? 'Roboto Regular' : 'RobotoRegular',
  primaryFontMedium: Platform.OS === 'ios' ? 'Roboto Medium' : 'RobotoMedium',
  primaryFontBold: Platform.OS === 'ios' ? 'Roboto Bold' : 'RobotoBold',
  primaryFontBlack: Platform.OS === 'ios' ? 'Roboto Black' : 'RobotoBlack',

  secondaryFont: 'Lato'
};