import { Image, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAssets, type Asset } from 'expo-asset';
import { Colors } from '@/constants/Colors';

export default function HomeScreen() {

  const [modelAssets, setModelAssets] = useState<Asset[] | null>(null)

  // ToDo: https://aachibilyaev.com/expo/workflow/prebuild/
  // ToDo: https://github.com/fs-eire/ort-rn-hello-world (from https://github.com/microsoft/onnxruntime/issues/11507)

  const loadModel = async() => {
    // const [assets, error] = useAssets([require('@/assets/models/model.onnx')]);
    // const modelAssets = await Asset.loadAsync(require('@/assets/models/model.onnx'));
    // if (assets) {
    //   setModelAssets(assets);
    // }
    // console.log('modelAssets:', assets || error);
  }

  useEffect(() => {
    loadModel();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: Colors.light.background, dark: Colors.dark.background }}
      headerImage={
        <Image
          source={require('@/assets/images/icon.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to Be.ai!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">{modelAssets?.length}</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0
  },
});
