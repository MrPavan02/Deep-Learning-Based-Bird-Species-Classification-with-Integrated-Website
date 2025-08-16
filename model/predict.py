import tensorflow as tf
import numpy as np
from PIL import Image

# Load class names
with open('model/class_names.txt', 'r') as f:
    class_names = eval(f.read())

# Load TFLite model
interpreter = tf.lite.Interpreter(model_path="model/model.tflite")
interpreter.allocate_tensors()
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

def preprocess_image(img_path):
    img = Image.open(img_path).convert("RGB").resize((300, 300))
    img = np.array(img) / 255.0
    img = np.expand_dims(img.astype(np.float32), axis=0)
    return img

def predict_image(img_path):
    img_array = preprocess_image(img_path)
    interpreter.set_tensor(input_details[0]['index'], img_array)
    interpreter.invoke()
    predictions = interpreter.get_tensor(output_details[0]['index'])
    predicted_class_index = np.argmax(predictions[0])
    predicted_bird = class_names[predicted_class_index]
    confidence = float(predictions[0][predicted_class_index])
    return predicted_bird, confidence
