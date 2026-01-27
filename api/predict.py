import os
import json
import base64
import io
import numpy as np
from PIL import Image
import tensorflow as tf
from http.server import BaseHTTPRequestHandler

# Always use Keras from TensorFlow
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

# Cache loaded models to improve performance
_model_cache = {}
_label_cache = {}

def load_model_cached(crop):
    """Load model with caching to improve performance"""
    if crop not in _model_cache:
        model_path = MODEL_PATHS.get(crop)
        if not model_path or not os.path.exists(model_path):
            raise ValueError(f"Model not found for crop: {crop}")
        _model_cache[crop] = keras.models.load_model(model_path, compile=False)
    return _model_cache[crop]

def load_labels_cached(crop):
    """Load labels with caching"""
    if crop not in _label_cache:
        label_path = LABEL_PATHS.get(crop)
        if not label_path or not os.path.exists(label_path):
            raise ValueError(f"Labels not found for crop: {crop}")
        with open(label_path, "r") as f:
            _label_cache[crop] = [line.strip() for line in f.readlines()]
    return _label_cache[crop]

def preprocess_image(image):
    """Preprocess image for model prediction"""
    image = image.resize((224, 224))
    image_array = np.asarray(image)
    image_array = image_array / 255.0
    image_array = np.expand_dims(image_array, axis=0)
    return image_array

def predict_disease(image_data, crop):
    """Predict disease from image data"""
    try:
        # Decode base64 image
        if isinstance(image_data, str):
            # Remove data URL prefix if present
            if 'base64,' in image_data:
                image_data = image_data.split('base64,')[1]
            image_bytes = base64.b64decode(image_data)
            image = Image.open(io.BytesIO(image_bytes))
        else:
            image = image_data
        
        # Convert to RGB if necessary
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Load model and labels
        model = load_model_cached(crop)
        class_names = load_labels_cached(crop)
        
        # Preprocess and predict
        processed_image = preprocess_image(image)
        prediction = model.predict(processed_image, verbose=0)
        
        # Get prediction results
        index = np.argmax(prediction)
        confidence = float(prediction[0][index])
        disease_name = class_names[index]
        
        return {
            "success": True,
            "disease": disease_name,
            "confidence": confidence,
            "crop": crop
        }
    
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

class handler(BaseHTTPRequestHandler):
    """Vercel serverless function handler"""
    
    def do_POST(self):
        try:
            # Get request body
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            # Validate input
            if 'image' not in data or 'crop' not in data:
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({
                    "success": False,
                    "error": "Missing 'image' or 'crop' in request body"
                }).encode())
                return
            
            # Make prediction
            result = predict_disease(data['image'], data['crop'])
            
            # Send response
            status_code = 200 if result['success'] else 500
            self.send_response(status_code)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(result).encode())
        
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({
                "success": False,
                "error": str(e)
            }).encode())
    
    def do_OPTIONS(self):
        """Handle CORS preflight requests"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
