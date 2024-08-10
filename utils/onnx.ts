import { InferenceSession, type Tensor } from "onnxruntime-react-native";

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