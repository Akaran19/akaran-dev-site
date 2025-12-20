import os
import joblib
import pandas as pd

# Load model and encoders
model = None
encoders = None

def load_model():
    global model, encoders
    if model is None:
        try:
            # Get the directory where this script is located
            script_dir = os.path.dirname(os.path.abspath(__file__))
            project_root = os.path.dirname(script_dir)  # Go up to project root

            model_path = os.path.join(project_root, 'credit-risk-app', 'XGBoost_credit_model.pkl')
            model = joblib.load(model_path)

            encoders = {}
            for col in ['Sex', 'Housing', 'Saving accounts', 'Checking account']:
                encoder_path = os.path.join(project_root, 'credit-risk-app', f'{col}_encoder.pkl')
                encoders[col] = joblib.load(encoder_path)

            print(f"Model loaded successfully from {model_path}")
        except Exception as e:
            print(f"Error loading model: {e}")
            return False
    return True

def handler(event, context):
    """Handle credit risk prediction requests"""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
            },
            'body': ''
        }

    if event.get('httpMethod') != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': '{"error": "Method not allowed"}'
        }

    try:
        # Load model if not already loaded
        if not load_model():
            return {
                'statusCode': 500,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                'body': '{"error": "Failed to load model"}'
            }

        # Parse request body
        body = event.get('body', '{}')
        if event.get('isBase64Encoded'):
            import base64
            body = base64.b64decode(body).decode('utf-8')

        import json
        data = json.loads(body)

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

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': f'{{"prediction": {prediction}}}'
        }

    except Exception as e:
        print(f"Prediction error: {e}")
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': f'{{"error": "{str(e)}"}}'
        }