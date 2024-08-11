import { Alert, Button, Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Asset } from 'expo-asset';
import { Colors } from '@/constants/Colors';

import * as ort from 'onnxruntime-react-native';

let myModel: ort.InferenceSession;

export default function HomeScreen() {

  // ToDo: https://aachibilyaev.com/expo/workflow/prebuild/
  // ToDo: https://github.com/fs-eire/ort-rn-hello-world (from https://github.com/microsoft/onnxruntime/issues/11507)

  async function loadModel() {
    try {
      const assets = await Asset.loadAsync(require('@/assets/models/mnist.ort'));
      const modelUri = assets[0].localUri;
      if (!modelUri) {
        Alert.alert('failed to get model URI', `${assets[0]}`);
      } else {
        myModel = await ort.InferenceSession.create(modelUri);
        Alert.alert(
          'model loaded successfully',
          `input names: ${myModel.inputNames}, output names: ${myModel.outputNames}`);
      }
    } catch (e) {
      Alert.alert('failed to load model', `${e}`);
      throw e;
    }
  }
  
  async function runModel() {
    try {
      const inputData = new Float32Array(28 * 28);
      const feeds:Record<string, ort.Tensor> = {};
      feeds[myModel.inputNames[0]] = new ort.Tensor(inputData, [1, 28, 28]);
      const fetches = await myModel.run(feeds);
      const output = fetches[myModel.outputNames[0]];
      if (!output) {
        Alert.alert('failed to get output', `${myModel.outputNames[0]}`);
      } else {
        Alert.alert(
          'model inference successfully',
          `output shape: ${output.dims}, output data: ${output.data}`);
      }
    } catch (e) {
      Alert.alert('failed to inference model', `${e}`);
      throw e;
    }
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
      <View style={styles.container}>
        <Text>using ONNX Runtime for React Native</Text>
        <Button title='Load model' onPress={loadModel}></Button>
        <Button title='Run' onPress={runModel}></Button>
        <StatusBar />
    </View>
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reactLogo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0
  },
});
