from flask import Flask, send_from_directory, send_file
import io
from yt_dlp import YoutubeDL
from contextlib import redirect_stdout
app = Flask(__name__, 
            static_url_path='/static', 
            static_folder='frontend/build/static')

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
        'postprocessors': [{  # Extract audio using ffmpeg
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
        }]
    }

    buffer = io.BytesIO()
    with redirect_stdout(buffer), YoutubeDL(ctx) as foo:
        foo.download([youtube_url])

    print(buffer.getbuffer().nbytes)
    return send_file(buffer, mimetype='audio/mpeg')


if __name__ == '__main__':
   app.run(debug=True)