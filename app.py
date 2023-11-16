from flask import Flask, send_from_directory, send_file
from flask_cors import CORS  # Import the CORS module
import io
from yt_dlp import YoutubeDL
from contextlib import redirect_stdout

app = Flask(__name__, static_url_path='/static', static_folder='frontend/build')
CORS(app)  # Enable CORS for all routes

@app.route('/')
def home():
    return send_from_directory('frontend/build', 'index.html')

@app.route('/stream')
def stream():
    youtube_url = "https://www.youtube.com/watch?v=kw4tT7SCmaY"
    ctx = {
        "outtmpl": "-",
        'logtostderr': True,
        'format': 'mp3/bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
        }]
    }

    buffer = io.BytesIO()
    with redirect_stdout(buffer), YoutubeDL(ctx) as foo:
        foo.download([youtube_url])

    buffer.seek(0)  # Move the buffer position to the beginning
    return send_file(buffer, mimetype='audio/mpeg')

if __name__ == '__main__':
    app.run(debug=True)
