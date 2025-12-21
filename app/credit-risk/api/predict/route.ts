export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Call the deployed XGBoost API on Railway
    const API_URL = process.env.CREDIT_RISK_API_URL || 'https://credit-risk-app-production-fcbd.up.railway.app';

    const response = await fetch(`${API_URL}/api/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const result = await response.json();
    return Response.json(result);

  } catch (error) {
    console.error("Prediction error:", error);

    // Fallback to approximation if API fails
    console.log("Falling back to approximation...");
    const { age, sex, job, housing, saving_accounts, checking_account, credit_amount, duration } = await request.json();

    // Encode categorical variables (matching the label encoders)
    const sex_encoded = sex === 'male' ? 1 : 0;
    const housing_encoded = housing === 'own' ? 1 : housing === 'rent' ? 2 : 0;
    const saving_encoded = saving_accounts === 'little' ? 0 : saving_accounts === 'moderate' ? 1 : saving_accounts === 'rich' ? 2 : 3;
    const checking_encoded = checking_account === 'little' ? 0 : checking_account === 'moderate' ? 1 : 2;

    // XGBoost model prediction logic (approximated)
    let prediction = 0;

    if (age > 35) prediction += 0.3;
    else if (age < 25) prediction -= 0.2;

    if (job >= 2) prediction += 0.4;
    else if (job === 0) prediction -= 0.3;

    if (housing_encoded === 1) prediction += 0.2;
    else if (housing_encoded === 2) prediction -= 0.1;

    if (saving_encoded >= 2) prediction += 0.5;
    else if (saving_encoded === 0) prediction -= 0.3;

    if (checking_encoded >= 1) prediction += 0.2;
    else prediction -= 0.2;

    if (credit_amount < 2000) prediction += 0.3;
    else if (credit_amount > 5000) prediction -= 0.4;

    if (duration <= 12) prediction += 0.2;
    else if (duration > 24) prediction -= 0.3;

    if (sex_encoded === 1) prediction += 0.1;

    const final_prediction = prediction > 0.5 ? 1 : 0;

    return Response.json({ prediction: final_prediction, fallback: true });
  }
}