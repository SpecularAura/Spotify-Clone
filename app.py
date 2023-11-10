from flask import Flask, render_template, send_from_directory
app = Flask(__name__, 
            static_url_path='/static', 
            static_folder='frontend/build/static')

@app.route('/')
def home():
   return send_from_directory('frontend/build', 'index.html')
if __name__ == '__main__':
   app.run()