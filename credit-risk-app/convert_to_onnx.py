import joblib
import pandas as pd
import numpy as np
from onnxmltools.convert import convert_xgboost
from onnx import save_model

# Load the model and encoders
print("Loading model and encoders...")
model = joblib.load('XGBoost_credit_model.pkl')
encoders = {col: joblib.load(f'{col}_encoder.pkl') for col in ['Sex', 'Housing', 'Saving accounts', 'Checking account']}

# Create sample input data to define the ONNX model input shape
# The model expects: Age, Sex, Job, Housing, Saving accounts, Checking account, Credit amount, Duration
sample_input = pd.DataFrame({
    'Age': [30.0],
    'Sex': [0],  # encoded value
    'Job': [1],
    'Housing': [0],  # encoded value
    'Saving accounts': [0],  # encoded value
    'Checking account': [0],  # encoded value
    'Credit amount': [1000.0],
    'Duration': [12.0]
})

print("Sample input shape:", sample_input.shape)
print("Sample input dtypes:", sample_input.dtypes)

# Convert to ONNX format using onnxmltools
print("Converting model to ONNX...")
# onnxmltools expects initial_types as a list of tuples: (name, type, shape)
initial_types = [('input', np.float32, sample_input.shape)]
onnx_model = convert_xgboost(model, initial_types=initial_types)

# Save the ONNX model
print("Saving ONNX model...")
save_model(onnx_model, 'credit_risk_model.onnx')

print("Model conversion completed!")
print("ONNX model saved as: credit_risk_model.onnx")

# Also save the encoders as JSON for JavaScript use
import json

encoders_dict = {}
for col, encoder in encoders.items():
    encoders_dict[col] = {
        'classes': encoder.classes_.tolist(),
        'mapping': {cls: int(idx) for idx, cls in enumerate(encoder.classes_)}
    }

with open('encoders.json', 'w') as f:
    json.dump(encoders_dict, f, indent=2)

print("Encoders saved as: encoders.json")

with open('encoders.json', 'w') as f:
    json.dump(encoders_dict, f, indent=2)

print("Encoders saved as: encoders.json")