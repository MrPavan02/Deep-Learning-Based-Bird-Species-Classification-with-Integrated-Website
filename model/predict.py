from tensorflow.keras.preprocessing import image
import numpy as np
from tensorflow.keras.models import load_model

# Load model and class names
loaded_model = load_model('model/model.h5')  # Adjust path
with open('model/class_names.txt', 'r') as f:
    class_names = eval(f.read())

def preprocess_image(img_path):
    img = image.load_img(img_path, target_size=(300, 300))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0
    return img_array

def predict_image(img_path):
    img_array = preprocess_image(img_path)
    predictions = loaded_model.predict(img_array)
    predicted_class_index = np.argmax(predictions, axis=1)[0]
    predicted_bird = class_names[predicted_class_index]
    confidence = predictions[0][predicted_class_index]
    return predicted_bird, float(confidence)

