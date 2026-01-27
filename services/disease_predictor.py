import os
import numpy as np
import tensorflow as tf
from utils.image_preprocessor import preprocess_image

# ✅ Always use Keras from TensorFlow
keras = tf.keras

# Get project root directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MODEL_PATHS = {
    "Apple": os.path.join(BASE_DIR, "models", "apple", "keras_model.h5"),
    "Tomato": os.path.join(BASE_DIR, "models", "tomato", "keras_model.h5"),
    "Potato": os.path.join(BASE_DIR, "models", "potato", "keras_model.h5")
}

LABEL_PATHS = {
    "Apple": os.path.join(BASE_DIR, "models", "apple", "labels.txt"),
    "Tomato": os.path.join(BASE_DIR, "models", "tomato", "labels.txt"),
    "Potato": os.path.join(BASE_DIR, "models", "potato", "labels.txt")
}

def predict_disease(image, crop):
    # Load model
    model = keras.models.load_model(MODEL_PATHS[crop], compile=False)

    # Load labels
    with open(LABEL_PATHS[crop], "r") as f:
        class_names = f.readlines()

    # Preprocess image
    processed_image = preprocess_image(image)

    # Predict
    prediction = model.predict(processed_image)
    index = np.argmax(prediction)

    disease_name = class_names[index].strip()
    return disease_name
