# Credit Risk API Deployment Guide

This Flask API serves the actual XGBoost credit risk model for predictions.

## Local Development
```bash
cd credit-risk-app
source venv/bin/activate
python api/app.py
```

Test with:
```bash
curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"age": 30, "sex": "male", "job": 1, "housing": "own", "saving_accounts": "moderate", "checking_account": "little", "credit_amount": 1000, "duration": 12}'
```

## Deployment to Railway

1. **Create Railway Account**: Go to [railway.app](https://railway.app) and sign up
2. **Install Railway CLI**: `npm install -g @railway/cli`
3. **Login**: `railway login`
4. **Deploy**:
   ```bash
   cd credit-risk-app
   railway init
   railway up
   ```
5. **Get the URL**: `railway domain`

## Deployment to Render

1. **Create Render Account**: Go to [render.com](https://render.com) and sign up
2. **Connect GitHub**: Link your GitHub repository
3. **Create Web Service**:
   - Runtime: Python 3
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `python api/app.py`

## Update Next.js App

Once deployed, update the environment variable in Vercel:

```bash
# In Vercel dashboard > Project Settings > Environment Variables
CREDIT_RISK_API_URL=https://your-deployed-api-url.com
```

## Files Needed for Deployment

- `api/app.py` - Main Flask application
- `requirements.txt` - Python dependencies
- `Procfile` - Deployment configuration
- `XGBoost_credit_model.pkl` - Trained model
- `*_encoder.pkl` - Label encoders