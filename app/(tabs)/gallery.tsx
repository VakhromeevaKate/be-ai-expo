import { View, StyleSheet, Text } from 'react-native';

export default function Gallery() {

  return (
    <View style={styles.container}>
      <Text>HELLLO GALLERY</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});
