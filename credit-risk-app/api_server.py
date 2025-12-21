from flask import Flask, request, jsonify
import joblib
import pandas as pd
import os

app = Flask(__name__)

# Load the model and encoders
model = joblib.load('XGBoost_credit_model.pkl')
encoders = {col: joblib.load(f'{col}_encoder.pkl') for col in ['Sex', 'Housing', 'Saving accounts', 'Checking account']}

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json

        # Encode categorical variables
        input_df = pd.DataFrame({
            'Age': [data['age']],
            'Sex': [encoders['Sex'].transform([data['sex']])[0]],
            'Job': [data['job']],
            'Housing': [encoders['Housing'].transform([data['housing']])[0]],
            'Saving accounts': [encoders['Saving accounts'].transform([data['saving_accounts']])[0]],
            'Checking account': [encoders['Checking account'].transform([data['checking_account']])[0]],
            'Credit amount': [data['credit_amount']],
            'Duration': [data['duration']]
        })

        # Make prediction
        prediction = model.predict(input_df)[0]

        return jsonify({'prediction': int(prediction)})

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)