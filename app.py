from flask import Flask, request, render_template, redirect, url_for, session, jsonify
import os
from model.predict import predict_image

app = Flask(__name__)
app.secret_key = 'your_secret_key'
UPLOAD_FOLDER = 'static/trash'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        img = request.files['image']
        if img:
            image_path = os.path.join(UPLOAD_FOLDER, img.filename)
            img.save(image_path)
            prediction, confidence = predict_image(image_path)

            session['image_path'] = image_path
            session['prediction'] = prediction
            session['confidence'] = confidence
            return redirect(url_for('result'))

    return render_template('index.html')

@app.route('/result')
def result():
    image_path = session.get('image_path')
    prediction = session.get('prediction')
    confidence = session.get('confidence')
    return render_template('result.html', image_path=image_path, prediction=prediction, confidence=confidence)


@app.route('/project-report')
def project_report():
    return render_template('project_report.html')

@app.route('/show-birds')
def show_birds():
    return render_template('show_birds.html')

@app.route('/get_bird_names')
def get_bird_names():
    try:
        with open('model/class_names.txt', 'r') as f:
            birds = eval(f.read()) 
        return jsonify(birds)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
