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
            script_dir = os.path.dirname(os.path.abspath(__file__))  # api/
            project_root = os.path.dirname(script_dir)  # project root

            model_path = os.path.join(project_root, 'credit-risk-app', 'XGBoost_credit_model.pkl')
            print(f"Looking for model at: {model_path}")
            print(f"Current working directory: {os.getcwd()}")
            print(f"Files in project root: {os.listdir(project_root) if os.path.exists(project_root) else 'N/A'}")

            if os.path.exists(model_path):
                model = joblib.load(model_path)
                print("Model loaded successfully")

                encoders = {}
                for col in ['Sex', 'Housing', 'Saving accounts', 'Checking account']:
                    encoder_path = os.path.join(project_root, 'credit-risk-app', f'{col}_encoder.pkl')
                    if os.path.exists(encoder_path):
                        encoders[col] = joblib.load(encoder_path)
                        print(f"Loaded encoder for {col}")
                    else:
                        print(f"Encoder not found: {encoder_path}")
                        return False
                return True
            else:
                print(f"Model file not found: {model_path}")
                return False
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
            'body': '{"message": "Predict endpoint is working - testing model loading"}'
        }

        # Uncomment below to test model loading
        # if not load_model():
        #     return {
        #         'statusCode': 500,
        #         'headers': {
        #             'Access-Control-Allow-Origin': '*',
        #             'Content-Type': 'application/json'
        #         },
        #         'body': '{"error": "Failed to load model"}'
        #     }
        # return {
        #     'statusCode': 200,
        #     'headers': {
        #         'Access-Control-Allow-Origin': '*',
        #         'Content-Type': 'application/json'
        #     },
        #     'body': '{"message": "Model loaded successfully"}'
        # }

    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': f'{{"error": "{str(e)}"}}'
        }