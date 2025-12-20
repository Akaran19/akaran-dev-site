export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Mock prediction logic (replace with real model later)
    const { age, sex, job, housing, saving_accounts, checking_account, credit_amount, duration } = data;
    
    // Simple mock prediction based on some basic rules
    let riskScore = 0;
    
    // Age factor
    if (age < 25) riskScore += 2;
    else if (age > 60) riskScore += 1;
    
    // Job factor
    if (job === 0) riskScore += 2;
    else if (job >= 2) riskScore -= 1;
    
    // Housing factor
    if (housing === "rent") riskScore += 1;
    else if (housing === "own") riskScore -= 1;
    
    // Account factors
    if (saving_accounts === "little") riskScore += 1;
    if (checking_account === "little") riskScore += 1;
    if (saving_accounts === "rich" || saving_accounts === "quite rich") riskScore -= 1;
    
    // Credit amount factor
    if (credit_amount > 5000) riskScore += 1;
    
    // Duration factor
    if (duration > 24) riskScore += 1;
    
    // Make prediction (1 = Good, 0 = Bad)
    const prediction = riskScore <= 3 ? 1 : 0;
    
    return Response.json({ prediction });
  } catch (error) {
    console.error("Prediction error:", error);
    return Response.json({ error: "Failed to make prediction" }, { status: 500 });
  }
}
