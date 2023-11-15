from flask import Flask, render_template, send_from_directory, jsonify, send_file
import io
import requests
app = Flask(__name__, 
            static_url_path='/static', 
            static_folder='frontend/build/static')

@app.route('/')
def home():
   return send_from_directory('frontend/build', 'index.html')


# This route is to show that the backend is able to retrieve and send songs from SoundCloud
@app.route('/api/getSong')
def getSong():
   CLIENT_ID = '9jJYDKHcEdy3IbZHsTAooey6e3VYbZ6G'
   api_url = f"https://api-v2.soundcloud.com/charts?kind=top&genre=soundcloud%3Agenres%3Aall-music&client_id={CLIENT_ID}&limit=10"
   try:
      response = requests.get(api_url)
      response.raise_for_status()
      data = response.json()
      songs_data = data['collection'][0]['track']['media']['transcodings']
      # print(songs_data)
      song_urls = []
      for song in songs_data:
         if song['format']['protocol'] == 'progressive':
            song_urls.append(song['url'])

      print(song_urls)

      response = requests.get(f"{song_urls[0]}?client_id={CLIENT_ID}")
      response.raise_for_status()

      file_url = response.json()
      file_url = file_url['url']

      song = requests.get(f"{file_url}&client_id={CLIENT_ID}")

      buffer = io.BytesIO(song.content)
      return send_file(
         buffer,
         mimetype="audio/mpeg"
      )
   
   except requests.exceptions.JSONDecodeError as e:
      print('Error in decoding the data:', str(e))
      return jsonify({'error': 'Failed to fetch SoundCloud data'}), 500
   
   except requests.exceptions.RequestException as e:
      print('Error fetching SoundCloud data:', str(e))
      return jsonify({'error': 'Failed to fetch SoundCloud data'}), 500
   
   except Exception as e:
      print(e)
      return jsonify({'error': 'Gadbad hai idhar'}), 500


if __name__ == '__main__':
   app.run(debug=True)