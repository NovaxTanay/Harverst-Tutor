from gtts import gTTS

LANGUAGE_CODES = {
    "English": "en",
    "Hindi": "hi",
    "Telugu": "te"
}

def generate_voice(text, language):
    lang_code = LANGUAGE_CODES.get(language, "en")
    tts = gTTS(text=text, lang=lang_code)

    output_file = "output_audio.mp3"
    tts.save(output_file)

    return output_file
