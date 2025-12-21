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
            print(f"Script directory: {script_dir}")

            model_path = os.path.join(script_dir, '..', 'XGBoost_credit_model.pkl')
            print(f"Model path: {model_path}")
            print(f"Model file exists: {os.path.exists(model_path)}")

            model = joblib.load(model_path)
            encoders = {}
            for col in ['Sex', 'Housing', 'Saving accounts', 'Checking account']:
                encoder_path = os.path.join(script_dir, '..', f'{col}_encoder.pkl')
                print(f"Encoder path for {col}: {encoder_path}")
                print(f"Encoder file exists: {os.path.exists(encoder_path)}")
                encoders[col] = joblib.load(encoder_path)

            print("Model and encoders loaded successfully")
        except Exception as e:
            print(f"Error loading model: {e}")
            import traceback
            traceback.print_exc()
            raise

# Try to load model when module is imported
try:
    load_model_and_encoders()
    print("Model loaded successfully on startup")
except Exception as e:
    print(f"Failed to load model on startup: {e}")

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

@app.route('/health')
def health():
    return {'status': 'ok', 'model_loaded': model is not None}

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)