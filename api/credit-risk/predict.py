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
            script_dir = os.path.dirname(os.path.abspath(__file__))  # api/credit-risk/
            api_dir = os.path.dirname(script_dir)  # api/
            project_root = os.path.dirname(api_dir)  # project root

            model_path = os.path.join(project_root, 'credit-risk-app', 'XGBoost_credit_model.pkl')
            print(f"Looking for model at: {model_path}")
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
    try:
        # Simple test response first
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': '{"message": "Predict endpoint is working"}'
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': f'{{"error": "{str(e)}"}}'
        }