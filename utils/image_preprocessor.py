import numpy as np

def preprocess_image(image):
    image = image.resize((224, 224))
    image_array = np.asarray(image)
    image_array = image_array / 255.0
    image_array = np.expand_dims(image_array, axis=0)
    return image_array
