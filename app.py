from flask import Flask, render_template, request, jsonify
import requests
from requests.utils import quote

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/weather', methods=['POST'])
def weather():
    city = request.form.get('city')
    if not city:
        return jsonify({'error': 'City name is required'}), 400
    
    city = request.form.get('city')
    api_key = 'ea4b05419bf5b6d0d57b7443bda8d598'  
    url = f'http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric&lang=fr'
    response = requests.get(url)
    data = response.json()
    return jsonify(data)
    
if __name__ == '__main__':
    app.run(debug=True)
