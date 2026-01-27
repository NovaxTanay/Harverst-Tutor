import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

# Environment variables are usually UPPERCASE
api_key = os.getenv("API_KEY")

# Pass as a keyword argument
genai.configure(api_key=api_key)

model = genai.GenerativeModel("models/gemini-2.5-flash")

def generate_explanation(crop, disease, language):
    prompt = f"""
You are an agricultural expert.

Crop: {crop}
Disease: {disease}

Explain this to a farmer in {language}.
Use very simple language.
Explain why it happened and how to prevent it.
"""
    response = model.generate_content(prompt)
    return response.text
