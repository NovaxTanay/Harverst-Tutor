import os
import json
import google.generativeai as genai
from http.server import BaseHTTPRequestHandler

# Configure Gemini API
api_key = os.getenv("API_KEY") or os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

def generate_explanation(crop, disease, language):
    """Generate farmer-friendly explanation using Google Gemini"""
    try:
        if not api_key:
            return {
                "success": False,
                "error": "API_KEY not configured. Please set GEMINI_API_KEY environment variable."
            }
        
        model = genai.GenerativeModel("models/gemini-1.5-flash")
        
        prompt = f"""
You are an agricultural expert advisor helping farmers understand crop diseases.

Crop: {crop}
Disease: {disease}
Language: {language}

Please provide a comprehensive explanation in {language} that includes:

1. **What is this disease?** (Simple explanation using everyday analogies)
2. **Why did this happen?** (Common causes: weather, soil, water, etc.)
3. **How to prevent it?** (Practical prevention tips)
4. **How to treat it now?** (Immediate treatment steps)

IMPORTANT GUIDELINES:
- Use VERY SIMPLE language that a farmer with basic education can understand
- Use local farming context and relatable examples
- Avoid technical jargon or scientific terms
- Keep it practical and actionable
- Be empathetic and encouraging
- If in Hindi or Telugu, use local agricultural terms farmers use

Format the response in clear sections with simple headings.
"""
        
        response = model.generate_content(prompt)
        
        return {
            "success": True,
            "explanation": response.text,
            "crop": crop,
            "disease": disease,
            "language": language
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
            required_fields = ['crop', 'disease', 'language']
            if not all(field in data for field in required_fields):
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({
                    "success": False,
                    "error": f"Missing required fields. Need: {', '.join(required_fields)}"
                }).encode())
                return
            
            # Generate explanation
            result = generate_explanation(
                data['crop'],
                data['disease'],
                data['language']
            )
            
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
