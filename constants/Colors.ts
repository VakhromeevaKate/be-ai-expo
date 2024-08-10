/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorBeLight = '#336021';
const tintColorBeDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#f4f2ef',
    tint: tintColorBeLight,
    icon: '#97bd88',
    tabIconDefault: '#97bd88',
    tabIconSelected: tintColorBeLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorBeDark,
    icon: '#97bd88',
    tabIconDefault: '#97bd88',
    tabIconSelected: tintColorBeDark,
  }
};
