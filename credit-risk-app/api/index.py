import sys
import os
from flask import Flask, request, jsonify
import pandas as pd
import joblib

app = Flask(__name__)

# Global variables for model and encoders
model = None
encoders = None

def load_model_and_encoders():
    global model, encoders
    if model is None:
        try:
            # Get the directory where this script is located
            script_dir = os.path.dirname(os.path.abspath(__file__))
            model_path = os.path.join(script_dir, '..', 'XGBoost_credit_model.pkl')

            model = joblib.load(model_path)
            encoders = {}
            for col in ['Sex', 'Housing', 'Saving accounts', 'Checking account']:
                encoder_path = os.path.join(script_dir, '..', f'{col}_encoder.pkl')
                encoders[col] = joblib.load(encoder_path)
        except Exception as e:
            print(f"Error loading model: {e}")
            raise

# Load model when module is imported
try:
    load_model_and_encoders()
except Exception as e:
    print(f"Failed to load model on startup: {e}")
    # Don't raise here, let the routes handle it

@app.route('/')
def home():
    return '''
    <!DOCTYPE html>
    <html>
    <head>
        <title>Credit Risk Prediction App</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
            .form-group { margin-bottom: 15px; }
            label { display: block; margin-bottom: 5px; font-weight: bold; }
            input, select { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
            button { background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
            button:hover { background: #0056b3; }
            .result { margin-top: 20px; padding: 15px; border-radius: 4px; }
            .good { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
            .bad { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
        </style>
    </head>
    <body>
        <h1>Credit Risk Prediction App</h1>
        <p>Enter the details of the applicant to predict if the credit risk is good or bad.</p>

        <form id="predictionForm">
            <div class="form-group">
                <label for="age">Age:</label>
                <input type="number" id="age" name="age" min="18" max="80" value="30" required>
            </div>

            <div class="form-group">
                <label for="sex">Sex:</label>
                <select id="sex" name="sex" required>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>

            <div class="form-group">
                <label for="job">Job (0-3):</label>
                <input type="number" id="job" name="job" min="0" max="3" value="1" required>
                <small>0: Unskilled and non-resident, 1: Unskilled and resident, 2: Skilled, 3: Highly skilled</small>
            </div>

            <div class="form-group">
                <label for="housing">Housing:</label>
                <select id="housing" name="housing" required>
                    <option value="own">Own</option>
                    <option value="free">Free</option>
                    <option value="rent">Rent</option>
                </select>
            </div>

            <div class="form-group">
                <label for="saving_accounts">Saving accounts:</label>
                <select id="saving_accounts" name="saving_accounts" required>
                    <option value="little">Little (&lt; 50 €)</option>
                    <option value="moderate">Moderate (50-250 €)</option>
                    <option value="rich">Rich (250-500 €)</option>
                    <option value="quite rich">Quite rich (&gt; 500 €)</option>
                </select>
            </div>

            <div class="form-group">
                <label for="checking_account">Checking account:</label>
                <select id="checking_account" name="checking_account" required>
                    <option value="little">Little (&lt; 0 €)</option>
                    <option value="moderate">Moderate (0-100 €)</option>
                    <option value="rich">Rich (&gt; 100 €)</option>
                </select>
            </div>

            <div class="form-group">
                <label for="credit_amount">Credit Amount:</label>
                <input type="number" id="credit_amount" name="credit_amount" min="0" value="1000" required>
            </div>

            <div class="form-group">
                <label for="duration">Duration (months):</label>
                <input type="number" id="duration" name="duration" min="1" value="12" required>
            </div>

            <button type="submit">Predict Risk</button>
        </form>

        <div id="result"></div>

        <script>
            document.getElementById('predictionForm').addEventListener('submit', async function(e) {
                e.preventDefault();

                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData);

                try {
                    const response = await fetch('/credit-risk/api/predict', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data)
                    });

                    const result = await response.json();
                    const resultDiv = document.getElementById('result');

                    if (result.error) {
                        resultDiv.innerHTML = '<div class="result bad">Error: ' + result.error + '</div>';
                    } else if (result.prediction === 1) {
                        resultDiv.innerHTML = '<div class="result good">The predicted credit risk is <strong>GOOD</strong>.</div>';
                    } else {
                        resultDiv.innerHTML = '<div class="result bad">The predicted credit risk is <strong>BAD</strong>.</div>';
                    }
                } catch (error) {
                    console.error('Error:', error);
                    document.getElementById('result').innerHTML = '<div class="result bad">Error making prediction. Please try again.</div>';
                }
            });
        </script>
    </body>
    </html>
    '''

@app.route('/test')
def test():
    return {'status': 'ok', 'message': 'Flask app is working'}

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        # Ensure model is loaded
        if model is None or encoders is None:
            load_model_and_encoders()

        data = request.get_json()

        # Extract form data
        age = int(data['age'])
        sex = data['sex']
        job = int(data['job'])
        housing = data['housing']
        saving_accounts = data['saving_accounts']
        checking_account = data['checking_account']
        credit_amount = int(data['credit_amount'])
        duration = int(data['duration'])

        # Prepare input for model
        input_df = pd.DataFrame({
            'Age': [age],
            'Sex': [encoders['Sex'].transform([sex])[0]],
            'Job': [job],
            'Housing': [encoders['Housing'].transform([housing])[0]],
            'Saving accounts': [encoders['Saving accounts'].transform([saving_accounts])[0]],
            'Checking account': [encoders['Checking account'].transform([checking_account])[0]],
            'Credit amount': [credit_amount],
            'Duration': [duration]
        })

        # Make prediction
        prediction = int(model.predict(input_df)[0])

        return jsonify({'prediction': prediction})

    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({'error': str(e)}), 500

# Translations dictionary
translations = {
    'en': {
        'title': 'Credit Risk Prediction App',
        'description': 'Enter the details of the applicant to predict if the credit risk is good or bad.',
        'age': 'Age',
        'sex': 'Sex',
        'job': 'Job (0-3)',
        'job_help': '0: Unskilled and non-resident, 1: Unskilled and resident, 2: Skilled, 3: Highly skilled',
        'housing': 'Housing',
        'housing_help': 'own: Owns property, free: Lives rent-free (e.g., with family), rent: Rents accommodation',
        'saving_accounts': 'Saving accounts',
        'saving_help': 'little: < 50 €, moderate: 50-250 €, rich: 250-500 €, quite rich: > 500 €',
        'checking_account': 'Checking account',
        'checking_help': 'little: < 0 €, moderate: 0-100 €, rich: > 100 €',
        'credit_amount': 'Credit Amount',
        'duration': 'Duration (months)',
        'predict_button': 'Predict Risk',
        'good_risk': 'The predicted credit risk is **GOOD**.',
        'bad_risk': 'The predicted credit risk is **BAD**.',
        'sex_options': ['male', 'female'],
        'housing_options': ['own', 'free', 'rent'],
        'saving_options': ['little', 'moderate', 'rich', 'quite rich'],
        'checking_options': ['little', 'moderate', 'rich'],
        'language': 'Language'
    },
    'da': {
        'title': 'Kreditrisiko ForudsigelsesApp',
        'description': 'Indtast ansøgerens oplysninger for at forudsige om kreditrisikoen er god eller dårlig.',
        'age': 'Alder',
        'sex': 'Køn',
        'job': 'Job (0-3)',
        'job_help': '0: Ufaglært uden opholdstilladelse, 1: Ufaglært med opholdstilladelse, 2: Faglært, 3: Højt kvalificeret',
        'housing': 'Bolig',
        'housing_help': 'ejet: Ejer ejendom, gratis: Bor leje-frit (f.eks. hos familie), lejet: Lejer bolig',
        'saving_accounts': 'Opsparingskonti',
        'saving_help': 'lidt: < 50 €, moderat: 50-250 €, rig: 250-500 €, meget rig: > 500 €',
        'checking_account': 'Lønkonto',
        'checking_help': 'lidt: < 0 €, moderat: 0-100 €, rig: > 100 €',
        'credit_amount': 'Kreditbeløb',
        'duration': 'Varighed (måneder)',
        'predict_button': 'Forudsig Risiko',
        'good_risk': 'Den forudsagte kreditrisiko er **GOD**.',
        'bad_risk': 'Den forudsagte kreditrisiko er **DÅRLIG**.',
        'sex_options': ['mand', 'kvinde'],
        'housing_options': ['ejet', 'gratis', 'lejet'],
        'saving_options': ['lidt', 'moderat', 'rig', 'meget rig'],
        'checking_options': ['lidt', 'moderat', 'rig'],
        'language': 'Sprog'
    }
}

# Mapping dictionaries to convert translated options back to English for encoders
option_mappings = {
    'sex': {'mand': 'male', 'kvinde': 'female', 'male': 'male', 'female': 'female'},
    'housing': {'ejet': 'own', 'gratis': 'free', 'lejet': 'rent', 'own': 'own', 'free': 'free', 'rent': 'rent'},
    'saving_accounts': {
        'lidt': 'little', 'moderat': 'moderate', 'rig': 'rich', 'meget rig': 'quite rich',
        'little': 'little', 'moderate': 'moderate', 'rich': 'rich', 'quite rich': 'quite rich'
    },
    'checking_account': {
        'lidt': 'little', 'moderat': 'moderate', 'rig': 'rich',
        'little': 'little', 'moderate': 'moderate', 'rich': 'rich'
    }
}

@app.route('/')
def home():
    return '''
    <!DOCTYPE html>
    <html>
    <head>
        <title>Credit Risk Prediction App</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
            .form-group { margin-bottom: 15px; }
            label { display: block; margin-bottom: 5px; font-weight: bold; }
            input, select { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
            button { background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
            button:hover { background: #0056b3; }
            .result { margin-top: 20px; padding: 15px; border-radius: 4px; }
            .good { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
            .bad { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
        </style>
    </head>
    <body>
        <h1>Credit Risk Prediction App</h1>
        <p>Enter the details of the applicant to predict if the credit risk is good or bad.</p>

        <form id="predictionForm">
            <div class="form-group">
                <label for="language">Language:</label>
                <select id="language" name="language">
                    <option value="en">English</option>
                    <option value="da">Dansk</option>
                </select>
            </div>

            <div class="form-group">
                <label for="age">Age:</label>
                <input type="number" id="age" name="age" min="18" max="80" value="30" required>
            </div>

            <div class="form-group">
                <label for="sex">Sex:</label>
                <select id="sex" name="sex" required>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>

            <div class="form-group">
                <label for="job">Job (0-3):</label>
                <input type="number" id="job" name="job" min="0" max="3" value="1" required>
                <small>0: Unskilled and non-resident, 1: Unskilled and resident, 2: Skilled, 3: Highly skilled</small>
            </div>

            <div class="form-group">
                <label for="housing">Housing:</label>
                <select id="housing" name="housing" required>
                    <option value="own">Own</option>
                    <option value="free">Free</option>
                    <option value="rent">Rent</option>
                </select>
                <small>own: Owns property, free: Lives rent-free, rent: Rents accommodation</small>
            </div>

            <div class="form-group">
                <label for="saving_accounts">Saving accounts:</label>
                <select id="saving_accounts" name="saving_accounts" required>
                    <option value="little">Little (&lt; 50 €)</option>
                    <option value="moderate">Moderate (50-250 €)</option>
                    <option value="rich">Rich (250-500 €)</option>
                    <option value="quite rich">Quite rich (&gt; 500 €)</option>
                </select>
            </div>

            <div class="form-group">
                <label for="checking_account">Checking account:</label>
                <select id="checking_account" name="checking_account" required>
                    <option value="little">Little (&lt; 0 €)</option>
                    <option value="moderate">Moderate (0-100 €)</option>
                    <option value="rich">Rich (&gt; 100 €)</option>
                </select>
            </div>

            <div class="form-group">
                <label for="credit_amount">Credit Amount:</label>
                <input type="number" id="credit_amount" name="credit_amount" min="0" value="1000" required>
            </div>

            <div class="form-group">
                <label for="duration">Duration (months):</label>
                <input type="number" id="duration" name="duration" min="1" value="12" required>
            </div>

            <button type="submit">Predict Risk</button>
        </form>

        <div id="result"></div>

        <script>
            document.getElementById('predictionForm').addEventListener('submit', async function(e) {
                e.preventDefault();

                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData);

                try {
                    const response = await fetch('/credit-risk/api/predict', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data)
                    });

                    const result = await response.json();
                    const resultDiv = document.getElementById('result');

                    if (result.prediction === 1) {
                        resultDiv.innerHTML = '<div class="result good">The predicted credit risk is <strong>GOOD</strong>.</div>';
                    } else {
                        resultDiv.innerHTML = '<div class="result bad">The predicted credit risk is <strong>BAD</strong>.</div>';
                    }
                } catch (error) {
                    console.error('Error:', error);
                    document.getElementById('result').innerHTML = '<div class="result bad">Error making prediction. Please try again.</div>';
                }
            });

            // Update form labels when language changes
            document.getElementById('language').addEventListener('change', function(e) {
                // This would need more complex logic to update all labels
                // For now, just reload the page or implement full i18n
            });
        </script>
    </body>
    </html>
    '''

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        # Ensure model is loaded
        if model is None or encoders is None:
            load_model_and_encoders()

        data = request.get_json()

        # Extract form data
        age = int(data['age'])
        sex = data['sex']
        job = int(data['job'])
        housing = data['housing']
        saving_accounts = data['saving_accounts']
        checking_account = data['checking_account']
        credit_amount = int(data['credit_amount'])
        duration = int(data['duration'])

        # Prepare input for model
        input_df = pd.DataFrame({
            'Age': [age],
            'Sex': [encoders['Sex'].transform([sex])[0]],
            'Job': [job],
            'Housing': [encoders['Housing'].transform([housing])[0]],
            'Saving accounts': [encoders['Saving accounts'].transform([saving_accounts])[0]],
            'Checking account': [encoders['Checking account'].transform([checking_account])[0]],
            'Credit amount': [credit_amount],
            'Duration': [duration]
        })

        # Make prediction
        prediction = int(model.predict(input_df)[0])

        return jsonify({'prediction': prediction})

    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({'error': str(e)}), 500