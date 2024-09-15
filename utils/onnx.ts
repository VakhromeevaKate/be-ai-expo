import { InferenceSession, type Tensor } from "onnxruntime-react-native";
import * as FileSystem from 'expo-file-system';
import * as ort from 'onnxruntime-react-native';

// load a model
export const getONNXSession = async(modelPath: string) => {
    const session: InferenceSession = await InferenceSession.create(modelPath);
    return session;
}

// input as InferenceSession.OnnxValueMapType
export const startONNXSession = async(session: InferenceSession, input: any) => {
    const result = await session.run(input, ['num_detection:0', 'detection_classes:0']);
    return result;
}

export const imageToFloatTensor = () => {

}


export const floatTensorToImage = () => {}

export const getUint8ArrayFromUri = async (uri: string): Promise<Uint8Array> => {
    try {
        const fileContent = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
        });
        const buffer = Buffer.from(fileContent, 'base64');
        return new Uint8Array(buffer);
    } catch (error) {
        console.error(error);
        return new Uint8Array();
    }
};

export const getTensorFromUint8Array = async (uri: string) => {
    const imageUint8ArrayData = await getUint8ArrayFromUri(uri);
    const dataLength = imageUint8ArrayData.length;
    return new ort.Tensor(imageUint8ArrayData, [dataLength]);
}