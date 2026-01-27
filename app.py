import streamlit as st
st.warning("🔥 NEW APP.PY IS RUNNING 🔥")

from PIL import Image

from services.disease_predictor import predict_disease
from services.genai_explainer import generate_explanation
from services.voice_generator import generate_voice

# ---------------- PAGE CONFIG ----------------
st.set_page_config(
    page_title="Harvest Tutor",
    page_icon="🌾",
    layout="centered"
)

# ---------------- SIMPLE CSS ----------------
st.markdown("""
<style>
.stButton>button {
    background-color: #2e7d32;
    color: white;
    font-size: 18px;
    height: 3em;
    border-radius: 10px;
}
.block-container {
    padding-top: 2rem;
}
</style>
""", unsafe_allow_html=True)

# ---------------- HEADER ----------------
st.markdown("<h1 style='text-align:center;'>🌾 Harvest Tutor</h1>", unsafe_allow_html=True)
st.markdown(
    "<p style='text-align:center; font-size:18px;'>AI-powered crop disease explanation with voice guidance</p>",
    unsafe_allow_html=True
)
st.markdown("---")

# ---------------- STEP 1: CROP + LANGUAGE ----------------
st.subheader("Step 1: Select Crop & Language 🌱")

col1, col2 = st.columns(2)

with col1:
    crop = st.selectbox(
        "Choose Crop",
        ["Tomato", "Potato", "Apple"]
    )

with col2:
    language = st.selectbox(
        "Choose Language",
        ["English", "Hindi", "Telugu"]
    )

# ---------------- STEP 2: IMAGE UPLOAD ----------------
st.subheader("Step 2: Upload Crop Image 📷")

uploaded_file = st.file_uploader(
    "Upload a clear photo of the affected leaf",
    type=["jpg", "png", "jpeg"]
)

if uploaded_file:
    image = Image.open(uploaded_file)
    st.image(image, caption="Uploaded Crop Image", use_column_width=True)

# ---------------- ANALYZE BUTTON ----------------
st.markdown("<br>", unsafe_allow_html=True)

analyze = st.button("🔍 Analyze Crop", use_container_width=True)

# ---------------- RESULTS ----------------
if analyze:
    if not uploaded_file:
        st.warning("⚠️ Please upload a crop image first")
    else:
        with st.spinner("Analyzing crop health..."):
            disease = predict_disease(image, crop)


        st.markdown("---")
        st.subheader("🦠 Detected Disease")
        st.success(disease)

        explanation = generate_explanation(crop, disease, language)

        st.subheader("📖 Easy Explanation")
        st.write(explanation)

        audio_file = generate_voice(explanation, language)

        st.subheader("🔊 Listen to Advice")
        st.audio(audio_file)

# ---------------- FOOTER ----------------
st.markdown("---")
st.caption("🌱 Designed for farmers • Voice-first • Simple & Accessible")
