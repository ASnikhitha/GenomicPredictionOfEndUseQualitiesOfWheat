from flask import Flask, render_template, request, jsonify
import joblib

app = Flask(__name__)

# Load models and vectorizers
envm = joblib.load(r"C:\Users\krish\OneDrive\Desktop\KMIT College\3rd year 1st Semester\FinalProject\CVModelsEverything.joblib")
vecenv = joblib.load(r"C:\Users\krish\OneDrive\Desktop\KMIT College\3rd year 1st Semester\FinalProject\CVVectorizersEverything.joblib")

env = ['Pooled', 'Delhi', 'Dharwad', 'Jharkhand', 'Karnal', 'Ludhiana']
cln = ['DH', 'GFD', 'GNPS', 'GWPS', 'PH', 'GY']


@app.route('/index')
def index():
    return render_template('CountVec.html', env=env)

@app.route('/')
def home():
    return render_template('Home.html')

@app.route('/sources')
def sources():
    return render_template('Sources.html')

@app.route('/traits')
def traits():
    return render_template('Traits.html')



@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        user_sequence = request.form['sequence']
        user_environment = request.form['environment']

        predictions = {}
        for cl in cln:
            new_sequences_vectorized = vecenv[user_environment][cl].transform([user_sequence])
            new_predictions = envm[user_environment][cl].predict(new_sequences_vectorized)
            predictions[cl] = new_predictions[0]

        return jsonify(predictions)


if __name__ == '__main__':
    app.run(debug=True)

