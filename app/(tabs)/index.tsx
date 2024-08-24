import { Alert, Button, Dimensions, Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { i18n } from '@/i18n/homeScreen.i18n';
import {
  BarChart,
  PieChart
} from 'react-native-chart-kit';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Asset } from 'expo-asset';
import { Colors } from '@/constants/Colors';

import * as ort from 'onnxruntime-react-native';
import { InferenceSession } from "onnxruntime-react-native";
import { GraphColors } from '@/constants/GraphColors';

export default function HomeScreen() {
  let myModel: InferenceSession;
  const screenWidth = Dimensions.get('window').width - 60;

  const waterGlassesData = {
    labels: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    datasets: [
      {
        data: [6, 8, 5, 8, 8, 8, 1]
      }
    ]
  };

  const mealData = [
    {
      name: "Carbohydrates",
      population: 100,
      color: GraphColors.light.carbohydrates,
      legendFontColor: GraphColors.light.legend,
      legendFontSize: 12
    },
    {
      name: "Fats",
      population: 50,
      color: GraphColors.light.fats,
      legendFontColor: GraphColors.light.legend,
      legendFontSize: 12
    },
    {
      name: "Proteins",
      population: 70,
      color: GraphColors.light.proteins,
      legendFontColor: GraphColors.light.legend,
      legendFontSize: 12
    },
    {
      name: "Fiber",
      population: 400,
      color: GraphColors.light.fiber,
      legendFontColor: GraphColors.light.legend,
      legendFontSize: 12
    }
  ];

  const pieChartConfig = {
    backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: () => Colors.light.text,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      },
      hasLegend: false,
  };

  const barChartConfig = {
    backgroundColor: Colors.light.background,
      backgroundGradientFrom: Colors.light.background,
      backgroundGradientTo: Colors.light.background,
      decimalPlaces: 0,
      color: () => GraphColors.light.water,
      labelColor: () => Colors.light.text,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
  };

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

  async function loadBeModel() {
    try {
      const assets = await Asset.loadAsync(require('@/assets/models/model.onnx'));
      const modelUri = assets[0].localUri;
      if (!modelUri) {
        Alert.alert('failed to get model URI', `${assets[0]}`);
      } else {
        // myModel = await ort.InferenceSession.create(modelUri);
        myModel = await InferenceSession.create(modelUri);
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
          'Mnist model inference successfully',
          `output shape: ${output.dims}, output data: ${output.data}`);
      }
    } catch (e) {
      Alert.alert('failed to inference model', `${e}`);
      throw e;
    }
  }

  async function runBeModel() {
    try {
      const inputData = new Float32Array(1 * 3 * 512 * 512);
      const feeds:Record<string, ort.Tensor> = {};
      feeds[myModel.inputNames[0]] = new ort.Tensor(inputData, [1, 3, 512, 512]);
      console.log('runBeModel feeds:', feeds['input0'].size);
      const fetches = await myModel.run(feeds);
      const output = fetches[myModel.outputNames[0]];
      if (!output) {
        Alert.alert('failed to get output', `${myModel.outputNames[0]}`);
      } else {
        Alert.alert(
          'Be model inference successfully',
          `output shape: ${output.dims}, output data: ${output.data}`);
      }
    } catch (e) {
      Alert.alert('failed to inference model', `${e}`);
      throw e;
    }
  }

  useEffect(() => {
    console.log(i18n.t('welcome'));
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
          <Button title='Load Mnist model' onPress={loadModel}></Button>
          <Button title='Run Mnist' onPress={runModel}></Button>
          <Button title='Load Be model' onPress={loadBeModel}></Button>
          <Button title='Run Be' onPress={runBeModel}></Button>
          <StatusBar />
        </View>
      </ThemedView>
      <ThemedView>
      <PieChart
        data={mealData}
        width={screenWidth}
        height={200}
        chartConfig={pieChartConfig}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        center={[10, 50]}
        absolute
      />
      </ThemedView>
      <ThemedView>
      <BarChart
        style={styles.barGraphStyle}
        data={waterGlassesData}
        width={screenWidth}
        height={220}
        yAxisLabel=""
        yAxisSuffix="cups"
        chartConfig={barChartConfig}
        verticalLabelRotation={30}
        />
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
  pieGraphStyle: {
    maxWidth: "80%",
    maxHeight: 200,
    margin: 20,
  },
  barGraphStyle: {
    maxWidth: "80%",
    maxHeight: 200,
    margin: 20,
  },
});
